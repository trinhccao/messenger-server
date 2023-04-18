import express from 'express'
import userController from '../controllers/user-controller'

const user = express.Router()

user.get('/', userController.users)
user.get('/:id', userController.user)

export default user
