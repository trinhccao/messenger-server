import mongoose from 'mongoose'

export interface ThreadSchema {
  name: string
  members: string[]
  createdAt: Date
  updatedAt: Date
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
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
})

export default mongoose.model('Thread', schema) 
