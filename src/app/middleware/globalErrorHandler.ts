/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong";

  type TErrorSources = {
    path: number | string;
    message: string;
  }[];

  let errorSources: TErrorSources = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];


  const handleZoderror = (err: ZodError) => {
    
  }
  if (err instanceof ZodError) {

    const simplifiedErros = handleZoderror(err);
    statusCode = 400;
    message = "zod error";
  }
  res.status(statusCode).json({
    success: false,
    message: message,
    error: err,
  });
};

export default globalErrorHandler;
