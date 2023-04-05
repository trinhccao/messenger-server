import mongoose from 'mongoose'
import { MessageSchema } from '../interfaces/MessageSchema'

const schema = new mongoose.Schema<MessageSchema>({
  conversationId: {
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
    type: Date,
    required: true,
  },
})

export default mongoose.model('Message', schema) 
