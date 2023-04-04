import { Request, Response } from 'express'
import Conversation from '../models/Conversation'
import { createHash } from 'node:crypto'

const conversationController = {
  getAll: async (req: Request, res: Response) => {
    const conversations = await Conversation.find()
    res.json(conversations)
  },

  getById: async (req: Request, res: Response) => {
    try {
      const conversationId = req.params.conversationId
      const conversation = await Conversation.findOne({ id: conversationId })
      if (!conversation) {
        return res.status(404).json({ message: 'Conversation not found' })
      }
      res.json(conversation)
    } catch (err) {
      res.status(404).json({ message: 'Conversation not found' })
    }
  },

  create: async (senderId: string, receiverId: string): Promise<string> => {
    const conversationId = createHash('md5')
      .update(receiverId + senderId)
      .digest('hex')

    const isExist = await Conversation.exists({ id: conversationId })

    if (isExist) {
      return isExist._id.toString()
    }

    const date = new Date()
    const conversation = await Conversation.create({
      id: conversationId,
      members: [senderId, receiverId],
      createdAt: date,
      updatedAt: date,
    })

    return conversation._id.toString()
  }
}

export default conversationController
