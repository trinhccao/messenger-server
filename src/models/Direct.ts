import mongoose from 'mongoose'

export interface DirectSchema {
  users: string[]
  createdAt: Date
  updatedAt: Date
}

const schema = new mongoose.Schema<DirectSchema>({
  users: {
    type: [String],
    required: true,
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

export default mongoose.model('Direct', schema) 
