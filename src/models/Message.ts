import mongoose from 'mongoose'

export interface MessageSchema {
  threadId: string
  userId: string
  content: string
  createdAt: number
}

const schema = new mongoose.Schema<MessageSchema>({
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

export default mongoose.model('Message', schema) 