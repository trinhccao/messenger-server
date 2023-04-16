import express from 'express'
import threadController from '../controllers/thread-controller'

const thread = express.Router()

thread.get('/', threadController.findAll)
thread.post('/direct', threadController.createDirect)
thread.post('/group', threadController.createGroup)

export default thread
