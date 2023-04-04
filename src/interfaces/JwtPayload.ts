import { UserSchema } from "./UserSchema";

export interface JwtPayload {
  user: Omit<UserSchema, 'password'> & { _id: string }
}
