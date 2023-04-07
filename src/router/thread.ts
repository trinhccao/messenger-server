import express from 'express'
import threadController from '../controllers/thread-controller'

const thread = express.Router()


thread.get('/', threadController.theads)
thread.post('/', threadController.create)
thread.use('/:id', threadController.verify)
thread.get('/:id', threadController.get)

export default thread
