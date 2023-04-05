import { Request, Response } from 'express'
import Message from '../models/Message'
import { UserInterface } from '../interfaces/UserInterface'
import Conversation from '../models/Conversation'

const messageController = {
  getAll: async (req: Request, res: Response) => {
    // retrieve all message in all conversations that the user is belong to
    const user = (req as any).user as UserInterface
    const conversations = await Conversation.find({ members: user._id })
    const conversationIds = conversations.map((item) => item._id.toString())
    const messages = await Message.find({ conversationId: conversationIds })
    res.json(messages)
  }
}

export default messageController
