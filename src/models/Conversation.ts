import mongoose from 'mongoose'
import { ConversationSchema } from '../interfaces/ConversationSchema'

const schema = new mongoose.Schema<ConversationSchema>({
  id: {
    type: String,
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
  }
})

export default mongoose.model('Conversation', schema) 
