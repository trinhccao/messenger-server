import mongoose from 'mongoose'

export enum ThreadTypes {
  Direct = 'direct',
  Group = 'group'
}

export interface ThreadSchema {
  _id: string
  name?: string
  members: string[]
  createdAt: number
  updatedAt: number
  avatar?: string
  type: ThreadTypes
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
  }
})

export default mongoose.model('Thread', schema) 
