import mongoose from 'mongoose'
import { UserSchema } from '../interfaces/UserSchema'

const schema = new mongoose.Schema<UserSchema>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
  avatar: String,
})

export default mongoose.model('User', schema) 
