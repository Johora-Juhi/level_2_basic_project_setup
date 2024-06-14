import { NextFunction, Request, Response } from "express";
import catchAsync from "./catchAsync";
import AppError from "../error/AppError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import { TUserRole } from "../modules/user/user.interface";
import config from "../config";
import { User } from "../modules/user/user.model";

const auth = (...requiresRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // auth check
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!s");
    }

    // token check
    const decoded = jwt.verify(
      token,
      config.jwt_access_token as string
    ) as JwtPayload;

    const { userId, role, iat } = decoded;

    const isUserExists = await User.isUserExists(userId);

    if (!isUserExists) {
      throw new AppError(httpStatus.NOT_FOUND, "User not found!");
    }

    const isUserDeleted = isUserExists?.isDeleted;

    if (isUserDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, "User is deleted!");
    }

    const userStatus = isUserExists?.status;

    if (userStatus === "blocked") {
      throw new AppError(httpStatus.FORBIDDEN, "User is blocked!");
    }

    
    if (requiresRoles && !requiresRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!s");
    }
    req.user = decoded;
    next();
  });
};

export default auth;
