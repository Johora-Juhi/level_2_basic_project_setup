export type TUser = {
  id: string;
  password: string;
  needsPasswordChange?: boolean;
  role: "student" | "faculty" | "admin";
  status: "in-process" | "blocked";
  isDeleted: boolean;
};

export type NewUser = {
  id: string;
  password: string;
  role: "student" | "faculty" | "admin";
};
