import { IUser } from "./user.types";

export interface ILogin {
  email: string;
  password: string;
}

export interface IResponseLogin {
  user: IUser;
  accessToken: string;
}
