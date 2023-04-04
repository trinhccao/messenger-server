import express from 'express'
import conversationController from '../controllers/conversation-controller'

const conversation = express.Router()

conversation.get('/', conversationController.getAll)
conversation.get('/:conversationId', conversationController.getById)

export default conversation
