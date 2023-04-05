import { Request, Response } from 'express'
import conversationController from './conversation-controller'
import Message from '../models/Message'

const chatController = {
  create: async (req: Request, res: Response) => {
    const { receiverId } = req.params
    const { content } = req.body
    const senderId = (req as any).user._id
    const conversationId = await conversationController
      .create(senderId, receiverId)
    const message = await Message.create({
      conversationId,
      userId: senderId,
      content,
      createdAt: new Date(),
    })
    res.sendStatus(201)
  },

  get: async (req: Request, res: Response) => {
    res.send('Chat Page')
  }
}

export default chatController
