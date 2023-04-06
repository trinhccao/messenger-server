import mongoose from 'mongoose'

export interface DirectSchema {
  members: string[]
  createdAt: number
  updatedAt: number
}

const schema = new mongoose.Schema<DirectSchema>({
  members: {
    type: [String],
    required: true,
  },
  createdAt: {
    type: Number,
    required: true,
  },
  updatedAt: {
    type: Number,
    required: true,
  }
})

export default mongoose.model('Direct', schema) 
