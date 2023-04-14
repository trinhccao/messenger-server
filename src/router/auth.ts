import express from 'express'
import authController from '../controllers/auth-controller'

const auth = express.Router()

auth.post('/login', authController.login)
auth.use(authController.verify)

export default auth
