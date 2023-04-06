import express from 'express'
import userController from '../controllers/user-controller'

const user = express.Router()

user.get('/', userController.read)
user.post('/', userController.create)
user.get('/:id', userController.readId)

export default user
