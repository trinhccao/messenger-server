import mongoose from 'mongoose'

export interface ThreadSchema {
  name: string
  members: string[]
  createdAt: number
  updatedAt: number
}

const schema = new mongoose.Schema<ThreadSchema>({
  name: {
    type: String,
    required: true,
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
})

export default mongoose.model('Thread', schema) 
