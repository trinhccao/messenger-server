import express from 'express'
import user from './user'
import authRouter from './auth'
import thread from './thread'
import message from './message'

const router = express.Router()

router.use(authRouter)
router.use('/users', user)
router.use('/threads', thread)
router.use('/messages', message)

export default router
