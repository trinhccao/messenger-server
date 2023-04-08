import express from 'express'
import messageController from '../controllers/message-controller'

const message = express.Router()

message.get('/', messageController.userMessages)

export default message
