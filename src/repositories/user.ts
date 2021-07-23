import { getRepository } from "typeorm";
import { User } from "../models";
import bcrypt from "bcrypt";
import { signJwt } from "../utils/jwtSignAndVerify";
import { ISignInUserPayload, IUserPayload } from "../types/types";

export const validateSignInUser = async (
  payload: ISignInUserPayload
): Promise<User | null> => {
  const { email, password } = payload;
  console.log("email", email, password);
  const userRepository = getRepository(User);
  const user = await userRepository.findOne({ email });
  console.log("user", user);
  if (!user) return null;
  const valid = await User.comparePassword(user, password);
  if (!valid) {
    return null;
  }
  return user;
};

export const createUser = async (payload: IUserPayload): Promise<User> => {
  const userRepository = getRepository(User);
  const user = new User();
  const password = await User.hashPassword(payload.password);
  const data = await userRepository.save({
    ...user,
    ...payload,
    password,
  });
  return data;
};

export const getUser = async (id: number): Promise<User | null> => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne({ id: id });
  if (!user) return null;
  return user;
};
