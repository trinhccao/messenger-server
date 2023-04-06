import mongoose from 'mongoose'

export interface UserSchema {
	username: string
	firstName: string
	lastName: string
	password: string
	createdAt: number
	updatedAt: number
	avatar?: string
}

const schema = new mongoose.Schema<UserSchema>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Number,
    required: true,
  },
  updatedAt: {
    type: Number,
    required: true,
  },
  avatar: String,
})

export default mongoose.model('User', schema) 
