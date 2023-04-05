import express from 'express'
import user from './user'
import message from './message'
import authRouter from './auth'

const router = express.Router()

router.use('/', authRouter)
router.use('/users', user)
router.use('/messages', message)

export default router
