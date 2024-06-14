import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import jwt from "jsonwebtoken";
import config from "../../config";

const loginUser = async (payload: TLoginUser) => {
  //   const isUserExists = await User.findOne({
  //     id: payload.id,
  //   });

  const isUserExists = await User.isUserExists(payload?.id);

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

  if (
    !(await User.isPasswordMatched(payload?.password, isUserExists?.password))
  ) {
    throw new AppError(httpStatus.FORBIDDEN, "Password did not match!");
  }

  const jwtPayload = {
    id: isUserExists?.id,
    role: isUserExists?.role,
  };
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_token as string, {
    expiresIn: "10d",
  });

  return {
    accessToken,
    needsPasswordChange: isUserExists?.needsPasswordChange,
  };
};

export const AuthServices = {
  loginUser,
};
