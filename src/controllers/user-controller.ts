import { Request, Response } from 'express'
import User from '../models/User'

const noPasword = { password: 0 }

const userController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const users = await User.find({}, noPasword)
      res.json(users)
    } catch (err) {
      res.sendStatus(500)
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const user = await User.findById(req.params.userId, noPasword)
      user
        ? res.json(user)
        : res.status(404).json({ message: 'User not found' })
    } catch (err) {
      res.sendStatus(500)
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const date = new Date()
      await User.create({ ...req.body, createdAt: date, updatedAt: date })
      res.status(201).json({ message: 'User created' })
    } catch (err) {
      res.status(400).json({ message: 'Bad request' })
    }
  },
}

export default userController
