import { DataUser } from './DataUser'

export interface DataJwtPayload {
  token: string
  tokenType: string
  user: DataUser
}
