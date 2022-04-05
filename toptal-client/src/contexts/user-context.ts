import React from "react";

export interface IUserContext {
  user: UserInfo;
  logout: (history) => void;
}

export interface UserInfo {
  username?: string;
  password?: string;
  email: string;
  name: string;
  id: string;
  caloriesLimit: number;
  monthlyLimit: number;
  userType: UserType;
}

export enum UserType {
  NONE,
  PATIENT,
  ADMIN,
}

export const UserContext = React.createContext<[IUserContext, (newUserContext: IUserContext) => void]>(undefined);
