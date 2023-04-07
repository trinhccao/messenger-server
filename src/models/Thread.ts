import mongoose from 'mongoose'

export interface ThreadSchema {
  name?: string
  members: string[]
  createdAt: number
  updatedAt: number
  avatar?: string
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
})

export default mongoose.model('Thread', schema) 
