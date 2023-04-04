import { Request, Response } from 'express'
import Conversation from '../models/Conversation'
import { ConversationSchema } from '../interfaces/ConversationSchema'

const conversationController = {
  getAll: async (req: Request, res: Response) => {
    const conversations = await Conversation.find()
    res.json(conversations)
  },

  getById: async (req: Request, res: Response) => {
    try {
      const conversationId = req.params.conversationId
      const conversation = await Conversation.findById(conversationId)
      if (!conversation) {
        return res.status(404).json({ message: 'Conversation not found' })
      }
      res.json(conversation)
    } catch (err) {
      res.status(404).json({ message: 'Conversation not found' })
    }
  },

  create: async (data: ConversationSchema) => {
    return await Conversation.create(data)
  }
}

export default conversationController
