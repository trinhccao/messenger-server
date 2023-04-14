import { Request } from 'express'
import { DataUser } from './DataUser'

export interface AuthorizedRequest extends Request {
  user: DataUser
}
