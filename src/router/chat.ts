import express from 'express'
import chatController from '../controllers/chat-controller'

const chat = express.Router()

chat.get('/messages', chatController.messages)
chat.get('/:id', chatController.chat)

export default chat
