/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import config from "../config";
import { TErrorSources } from "../instances/error";
import handleZodError from "../error/handleZoderror";
import handleValidationError from "../error/handleValidationError";
import handleCastError from "../error/handleCastError";
import handleDuplicateError from "../error/handleDuplicateError";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong";

  let errorSources: TErrorSources = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedErros = handleZodError(err);

    statusCode = simplifiedErros?.statusCode;
    message = simplifiedErros?.message;
    errorSources = simplifiedErros?.errorSources;
  } else if (err?.name === "ValidationError") {
    const simplifiedErros = handleValidationError(err);

    statusCode = simplifiedErros?.statusCode;
    message = simplifiedErros?.message;
    errorSources = simplifiedErros?.errorSources;
  } else if (err?.name === "CastError") {
    const simplifiedErros = handleCastError(err);

    statusCode = simplifiedErros?.statusCode;
    message = simplifiedErros?.message;
    errorSources = simplifiedErros?.errorSources;
  } else if (err?.code === 11000) {
    const simplifiedErros = handleDuplicateError(err);

    statusCode = simplifiedErros?.statusCode;
    message = simplifiedErros?.message;
    errorSources = simplifiedErros?.errorSources;
  }

  res.status(statusCode).json({
    success: false,
    message: message,
    errorSources: errorSources,
    stack: config.node_env === "development" ? err : null,
  });
};

export default globalErrorHandler;
