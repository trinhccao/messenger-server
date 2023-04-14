import express from 'express'
import userController from '../controllers/user-controller'

const user = express.Router()

user.post('/', userController.create)
user.get('/:id', userController.read)

export default user
