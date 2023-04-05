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
        return res.sendStatus(404)
      }
      res.json(conversation)
    } catch (err) {
      res.sendStatus(404)
    }
  },

  create: async (senderId: string, receiverId: string): Promise<string> => {
    const concat = [senderId, receiverId]
      .sort()
      .reduce((one, two) => (one + two), '')
    const conversationId = createHash('md5')
      .update(concat)
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
