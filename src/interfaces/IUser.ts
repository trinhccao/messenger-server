import { UserSchema } from '../models/User'

export interface IUser extends  Omit<UserSchema, 'password'> {
  _id: string
}
