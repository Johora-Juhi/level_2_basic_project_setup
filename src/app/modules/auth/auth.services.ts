import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { User } from "../user/user.model";
import { TChangePassword, TLoginUser } from "./auth.interface";
import { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import bcrypt from "bcrypt";
import { createToken } from "./auth.utils";

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
    userId: isUserExists?.id,
    role: isUserExists?.role,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_token as string,
    config.jwt_access_expires_in as string
  );
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_token as string,
    config.jwt_refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: isUserExists?.needsPasswordChange,
  };
};

const changePassword = async (user: JwtPayload, payload: TChangePassword) => {
  const isUserExists = await User.isUserExists(user?.userId);

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
    !(await User.isPasswordMatched(
      payload?.oldPassword,
      isUserExists?.password
    ))
  ) {
    throw new AppError(httpStatus.FORBIDDEN, "Password did not match!");
  }

  const hashedPassword = await bcrypt.hash(
    payload?.newPassword,
    Number(config.bcrypt_salt_rounds)
  );

  await User.findOneAndUpdate(
    {
      id: user.userId,
      role: user.role,
    },
    {
      password: hashedPassword,
      needsPasswordChange: false,
      passwordUpdatedAt: new Date(),
    }
  );
  return null;
};

export const AuthServices = {
  loginUser,
  changePassword,
};
