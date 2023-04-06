import express from 'express'
import user from './user'
import authRouter from './auth'
import thread from './thread'
import direct from './direct'

const router = express.Router()

router.use(authRouter)
router.use('/users', user)
router.use('/threads', thread)
router.use('/directs', direct)

export default router
