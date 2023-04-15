import express from 'express'
import chatController from '../controllers/chat-controller'

const chat = express.Router()

chat.get('/messages', chatController.messages)
chat.get('/conversations', chatController.conversations)
chat.get('/:id', chatController.chat)
chat.post('/:id', chatController.sendMessage)

export default chat
