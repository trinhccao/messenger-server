import express from 'express'
import userController from '../controllers/user-controller'

const user = express.Router()

user.get('/', userController.getAll)
user.get('/:userId', userController.getById)
user.post('/', userController.create)

export default user
