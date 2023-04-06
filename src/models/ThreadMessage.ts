import mongoose from 'mongoose'

export interface ThreadMessageSchema {
  threadId: string
  userId: string
  content: string
  createdAt: number
}

const schema = new mongoose.Schema<ThreadMessageSchema>({
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
})

export default mongoose.model('ThreadMessage', schema) 
