import { UserSchema } from './UserSchema'

export interface UserInterface extends Omit<UserSchema, 'password'> {
  _id: string
}
