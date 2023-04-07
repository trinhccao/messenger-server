import express from 'express'
import user from './user'
import authRouter from './auth'
import thread from './thread'

const router = express.Router()

router.use(authRouter)
router.use('/users', user)
router.use('/threads', thread)

export default router
