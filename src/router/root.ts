import express from 'express'
import User from '../models/User'
import Conversation from '../models/Conversation'
import Message from '../models/Message'

const router = express.Router()

router.get('/users', async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

router.get('/conversations', async (req, res) => {
  const conversations = await Conversation.find({})
  res.json(conversations)
})

router.get('/messages', async (req, res) => {
  const messages = await Message.find({})
  res.json(messages)
})

export default router
