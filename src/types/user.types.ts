export type IAccountType = "FREE" | "PREMIUM";

export interface IUser {
  _id: string;
  email: string;
  name: string;
  role: string;
  phone_number: string;
  score: number;
  accountType: IAccountType;
  address: string;
  __v: number;
  premiumExpiresAt: Date;
  createdAt: string;
  updatedAt: string;
}

export interface IQueryUser {
  page: number;
  limit: number;
  total: number;
  nameLike: string;
}

export type IRole = "USER" | "ADMIN";

export interface IUserUpdate {
  name: string;
  phoneNumber?: string;
  address?: string;
}
