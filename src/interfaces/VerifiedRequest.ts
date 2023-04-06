import { Request } from 'express'
import { IUser } from './IUser'

export interface verifiedRequest extends Request {
  user: IUser
}
