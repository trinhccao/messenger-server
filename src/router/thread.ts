import express from 'express'
import threadController from '../controllers/thread-controller'

const thread = express.Router()


thread.get('/', threadController.theads)
thread.post('/', threadController.createThreads)
thread.use('/:id', threadController.checkThreadPermission)
thread.get('/:id', threadController.readThread)
thread.get('/:id/messages', threadController.readTheadMessages)
thread.post('/:id/messages', threadController.createTheadMessages)

export default thread
