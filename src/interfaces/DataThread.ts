import { ThreadScopes, ThreadTypes } from '../models/Thread'

export interface DataThread {
  _id: string
  name: string
  members: string[]
  createdAt: number
  updatedAt: number
  avatar: string
  type: ThreadTypes
  scopes: ThreadScopes[]
}
