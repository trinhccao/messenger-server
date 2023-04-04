import { Request, Response } from 'express'
import Message from '../models/Message'
import conversationController from './conversation-controller'

const messageController = {
  getAll: async (req: Request, res: Response) => {
    const messages = await Message.find({})
    res.json(messages)
  }
}

export default messageController
