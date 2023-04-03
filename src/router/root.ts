import express from 'express'
import user from './user'
import conversation from './conversation'
import message from './message'

const router = express.Router()

router.use('/users', user)
router.use('/conversations', conversation)
router.use('/messages', message)

export default router
