import { Request, Response } from 'express'
import User from '../models/User'

const noPasword = { password: 0 }

const userController = {
  read: async (req: Request, res: Response) => {
    try {
      const users = await User.find({}, noPasword)
      res.json(users)
    } catch (err) {
      res.sendStatus(500)
    }
  },

  readId: async (req: Request, res: Response) => {
    try {
      const user = await User.findById(req.params.id, noPasword)
      user ? res.json(user) : res.sendStatus(404)
    } catch (err) {
      res.sendStatus(404)
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const date = new Date()
      await User.create({ ...req.body, createdAt: date, updatedAt: date })
      res.sendStatus(201)
    } catch (err) {
      res.sendStatus(400)
    }
  },
}

export default userController
