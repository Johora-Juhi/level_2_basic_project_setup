import { Model } from "mongoose";

export interface TUser {
  id: string;
  password: string;
  needsPasswordChange?: boolean;
  role: "student" | "faculty" | "admin";
  status: "in-process" | "blocked";
  isDeleted: boolean;
}

export type NewUser = {
  id: string;
  password: string;
  role: "student" | "faculty" | "admin";
};

export interface UserModel extends Model<TUser> {
  isUserExists(id: string): Promise<TUser>;
  isPasswordMatched(
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
}
