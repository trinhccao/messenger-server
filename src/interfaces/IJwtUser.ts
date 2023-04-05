import { UserSchema } from './UserSchema'

export interface IJwtUser {
  user: Omit<UserSchema, 'password'> & { _id: string }
}
