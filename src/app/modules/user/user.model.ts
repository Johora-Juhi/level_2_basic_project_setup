/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const UserSchema = new Schema<TUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    passwordUpdatedAt: {
      type: Date,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ["student", "faculty", "admin"],
    },
    status: {
      type: String,
      enum: ["in-process", "blocked"],
      default: "in-process",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// pre save middleware/ hook : will work on create() and save()
UserSchema.pre("save", async function (next) {
  const user = this; // doc

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

// post save middleware/ hook : will work on create() and save()
UserSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

UserSchema.statics.isUserExists = async function (id: string) {
  return await User.findOne({ id }).select(
    "+password"
  ); /** i have selected 0 for not fetchin the password for every find operation, 
  so where i need to access it i have to add it in the select with + so that it comes with other data,
   otherwise it will onkly fetch password data */
};

UserSchema.statics.isPasswordMatched = async function (
  plainPassword: string,
  hashedPassword: string
) {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

UserSchema.statics.isJWTIssuedBeforePasswordChange = async function (
  JWTIssuedAt: number,
  passwordChangedAt: Date
) {
  
};
export const User = model<TUser, UserModel>("User", UserSchema);
