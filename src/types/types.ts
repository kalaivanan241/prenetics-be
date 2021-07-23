export interface ISignInUserPayload {
  email: string;
  password: string;
}

export interface IUserPayload extends ISignInUserPayload {
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
}

export interface IUserWithToken {
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  token: string;
}
