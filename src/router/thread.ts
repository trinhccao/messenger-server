import express from 'express'
import threadController from '../controllers/thread-controller'

const thread = express.Router()

thread.get('/', threadController.findAll)
thread.use('/:id', threadController.verify)
thread.post('/:id', threadController.addMessage)
thread.post('/direct', threadController.createDirect)
thread.post('/group', threadController.createGroup)

export default thread
