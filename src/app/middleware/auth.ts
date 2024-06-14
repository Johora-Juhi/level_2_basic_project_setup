import { NextFunction, Request, Response } from "express";
import catchAsync from "./catchAsync";
import AppError from "../error/AppError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";

const auth = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // auth check

    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!s");
    }
    jwt.verify(token, "shhhhh", function (err, decoded) {
      if (err) {
        throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!s");
      }

      req.user = decoded as JwtPayload;
      next();
    });
  });
};

export default auth;
