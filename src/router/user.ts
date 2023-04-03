import express from 'express'
import userController from '../controllers/user-controller'

const router = express.Router()

router.get('/', userController.getAll)
router.get('/:userId', userController.getById)
router.post('/', userController.create)

export default router
