import mongoose from 'mongoose'

export interface UserSchema {
	username: string
	firstName: string
	lastName: string
	password: string
	createdAt: Date
	updatedAt: Date
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
