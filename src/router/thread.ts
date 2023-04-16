import express from 'express'
import threadController from '../controllers/thread-controller'

const thread = express.Router()

thread.get('/', threadController.findAll)
thread.post('/directs', threadController.createDirect)

export default thread
