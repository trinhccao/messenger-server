import mongoose from 'mongoose'

export enum ThreadTypes {
  Direct = 'direct',
  Group = 'group'
}

export enum ThreadScopes {
  Any = 'any',
  Member = 'member'
}

export interface ThreadSchema {
  name?: string
  members: string[]
  createdAt: number
  updatedAt: number
  avatar?: string
  type: ThreadTypes
  scopes: ThreadScopes[]
}

const schema = new mongoose.Schema<ThreadSchema>({
  name: {
    type: String,
  },
  members: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Number,
    required: true,
  },
  updatedAt: {
    type: Number,
    required: true,
  },
  avatar: {
    type: String,
  },
  type: {
    type: String,
    required: true,
  },
  scopes: {
    type: [String],
    default: [ThreadScopes.Member],
  }
})

export default mongoose.model('Thread', schema)
