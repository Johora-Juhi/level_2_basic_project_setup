import { Router } from "express";
import { AuthControllers } from "./auth.controller";
import ValidateRequest from "../../middleware/validateRequest";
import { authValidations } from "./auth.validation";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constants";

const router = Router();

router.post(
  "/login-user",
  ValidateRequest(authValidations.loginValidationSchema),
  AuthControllers.loginUser
);

router.post(
  "/change-password",
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  ValidateRequest(authValidations.changePasswordValidationSchema),
  AuthControllers.changePassword
);

router.post(
  "/refresh-token",
  ValidateRequest(authValidations.refreshTokenValidationSchema),
  AuthControllers.refreshToken
);

export const AuthRoutes = router;
