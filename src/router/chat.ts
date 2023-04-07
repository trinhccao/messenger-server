import express from 'express'
import chatController from '../controllers/chat-controller'

const chat = express.Router()

chat.get('/:id', chatController.getThread)
chat.post('/:id', chatController.verify)
chat.post('/:id', chatController.createMessage)

export default chat
