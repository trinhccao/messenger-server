import express from 'express'
import user from './user'
import conversation from './conversation'
import message from './message'
import authRouter from './auth'
import chatRouter from './chat'

const router = express.Router()

router.use('/', authRouter)
router.use('/users', user)
router.use('/conversations', conversation)
router.use('/messages', message)
router.use('/chat', chatRouter)

export default router
