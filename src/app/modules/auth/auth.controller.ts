import httpStatus from "http-status";
import catchAsync from "../../middleware/catchAsync";
import SendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.services";
import config from "../../config";

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { refreshToken } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: config.node_env === "production",
    httpOnly: true,
  });

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Logged in successfully",
    data: result,
  });
});

const changePassword = catchAsync(async (req, res) => {
  const result = await AuthServices.changePassword(req.user, req.body);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password changed successfully",
    data: result,
  });
});

export const AuthControllers = {
  loginUser,
  changePassword,
};
