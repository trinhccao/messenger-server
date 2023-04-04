import express from 'express'

const message = express.Router()

message.get('/', async (req, res) => {
  res.send('messages')
})

export default message
