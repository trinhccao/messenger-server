import Message, { MessageSchema } from '../models/Message'

const messageController = {
  messages: async (threadId: string) => {
    return await Message.find({ threadId })
  },

  create: async (data: MessageSchema) => {
    return await Message.create(data)
  }
}

export default messageController
