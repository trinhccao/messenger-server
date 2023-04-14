import express from 'express'
import threadController from '../controllers/thread-controller'

const thread = express.Router()


// thread.get('/', threadController.theads)
// thread.post('/', threadController.create)
// thread.use('/:id', threadController.verify)
// thread.get('/:id', threadController.get)
// thread.get('/:id/messages', threadController.messages)
// thread.get('/:id/messages/latest', threadController.latestMessage)

export default thread
