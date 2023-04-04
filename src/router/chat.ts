import express from 'express'
import conversationController from '../controllers/conversation-controller'

const chatRouter = express.Router()

chatRouter.post('/:receiverId', (req, res) => {
  conversationController.create('a', 'b')
})

export default chatRouter
