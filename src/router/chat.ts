import express from 'express'
import chatController from '../controllers/chat-controller'

const chat = express.Router()

chat.post('/:receiverId', chatController.create)
chat.get('/:receiverId', chatController.get)

export default chat
