import mongoose from 'mongoose'

export enum ThreadTypes {
  Direct = 'direct',
  Group = 'group'
}

export enum ThreadScopes {
  Any = 'any',
  Member = 'member'
}

export interface ThreadMessageSchema {
  threadId: string
  userId: string
  content: string
  createdAt: number
}

export interface ThreadSchema {
  directId?: string
  name?: string
  members: string[]
  createdAt: number
  updatedAt: number
  avatar?: string
  type: ThreadTypes
  scopes: ThreadScopes[]
  messages: ThreadMessageSchema[]
}

const threadSchema = new mongoose.Schema({
  directId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
  },
  members: {
    type: [String]
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
  },
  messages: [
    {
      threadId: {
        type: String,
        required: true,
      },
      userId: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Number,
        required: true,
      },
    }
  ]
})

export default mongoose.model('Thread', threadSchema)
export { threadSchema }
