export enum UserType {
  NONE,
  USER,
  ADMIN,
}

export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  userType: number;
  caloriesLimit: number;
  monthlyLimit: number;
}
