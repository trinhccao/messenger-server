import { Request, Response } from 'express'
import Message, { MessageSchema } from '../models/Message'
import { verifiedRequest } from '../interfaces/VerifiedRequest'

const messageController = {
  messages: async (threadId: string) => {
    return await Message.find({ threadId })
  },

  create: async (data: MessageSchema) => {
    return await Message.create(data)
  },

  userMessages: async (req: Request, res: Response) => {
    try {
      const userId = (req as verifiedRequest).user._id
      const messages = await Message.find({ userId })
      res.json(messages)
    } catch (err) {
      res.sendStatus(400)
    }
  }
}

export default messageController
