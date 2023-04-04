import express from 'express'
import messageController from '../controllers/message-controller'

const message = express.Router()

message.get('/', messageController.getAll)

export default message
