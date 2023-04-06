import { UserSchema } from '../models/User'

export interface IJwtPayload {
  token: string
  tokenType: string
  user: Omit<UserSchema, 'password'> & { _id: string }
}
