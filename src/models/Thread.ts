import mongoose from 'mongoose'

export interface ThreadSchema {
  id: string
  members: string[]
  createdAt: Date
  updatedAt: Date
}

const schema = new mongoose.Schema<ThreadSchema>({
  id: {
    type: String,
    required: true,
    unique: true,
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
