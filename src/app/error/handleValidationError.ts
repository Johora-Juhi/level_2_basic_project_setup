import mongoose from "mongoose";
import { TErrorSources, TGenericErrorResponse } from "../instances/error";

const handleValidationError = (
  err: mongoose.Error.ValidationError
): TGenericErrorResponse => {
  const errorSources: TErrorSources = Object.values(err.errors).map((val) => {
    return {
      path: val?.path,
      message: val?.message,
    };
  });

  const statusCode = 400;

  return {
    statusCode,
    message: "Validation error",
    errorSources,
  };
};

export default handleValidationError;
