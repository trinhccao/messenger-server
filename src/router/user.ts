import express from 'express'
import userController from '../controllers/user-controller'

const user = express.Router()

user.get('/', userController.users)
user.post('/', userController.createUsers)
user.get('/:id', userController.readUser)

export default user
