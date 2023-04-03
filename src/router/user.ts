import express from 'express'
import userController from '../controllers/user-controller'

const router = express.Router()

router.get('/', async (req, res) => {
  res.send('users')
})

router.post('/', userController.create)

export default router
