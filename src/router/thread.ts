import express from 'express'
import threadController from '../controllers/thread-controller'

const thread = express.Router()

thread.get('/', threadController.findAll)
thread.use('/:id', threadController.verify)
thread.post('/:id', threadController.addMessage)
thread.get('/:id', threadController.findById)

export default thread
