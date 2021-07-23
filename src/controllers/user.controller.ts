import { Get, Route, Tags, Post, Body, Path } from "tsoa";
import { User } from "../models";
import { signInSchema, signUpSchema } from "../models/user";
import { validateSignInUser, createUser, getUser } from "../repositories/user";
import { IUserPayload, IUserWithToken } from "../types/types";
import { createUserWithToken } from "../utils/jwtSignAndVerify";
import { validateSchema } from "../utils/validateRequest";

@Route("users")
@Tags("User")
export default class UserController {
  @Post("/signin")
  public async signInUser(
    @Body() body: { email: string; password: string }
  ): Promise<
    | IUserWithToken
    | null
    | {
        [key: string]: string;
      }
  > {
    if (!body) {
      return null;
    }

    const { errors } = await validateSchema(signInSchema, body);
    if (errors) {
      return errors;
    }
    const user = await validateSignInUser(body);
    if (!user) {
      return { errors: "Email address or password is incorrect" };
    }
    return createUserWithToken(user);
  }

  @Post("/")
  public async registerUser(@Body() body: IUserPayload | null): Promise<
    | IUserWithToken
    | null
    | {
        [key: string]: string;
      }
  > {
    if (!body) {
      return null;
    }
    const { errors } = await validateSchema(signUpSchema, body);

    if (errors) {
      return errors;
    }
    const user = await createUser(body);
    if (!user) {
      return { errors: "Something went wrong" };
    }
    return createUserWithToken(user);
  }

  @Get("/:id")
  public async getUser(@Path() id: string): Promise<User | null> {
    return getUser(Number(id));
  }
}
