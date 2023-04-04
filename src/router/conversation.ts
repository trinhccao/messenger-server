import express from 'express'

const conversation = express.Router()

conversation.get('/', async (req, res) => {
  res.send('conversations')
})

export default conversation
