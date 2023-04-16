import express from 'express'
import chatController from '../controllers/chat-controller'

const chat = express.Router()

chat.get('/:slug', chatController.findThreadId)

export default chat
