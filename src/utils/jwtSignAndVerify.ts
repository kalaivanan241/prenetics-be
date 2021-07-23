import jwt from "jsonwebtoken";
import { User } from "../models";
import { IUserWithToken } from "../types/types";

const secret = "SuperScret";

export const signJwt = (payload: any): string => {
  return jwt.sign(payload, secret);
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, secret);
};

export const createUserWithToken = (user: User): IUserWithToken => {
  const payloadData = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    dateOfBirth: user?.dateOfBirth,
  };

  return { ...payloadData, token: signJwt(payloadData) };
};
