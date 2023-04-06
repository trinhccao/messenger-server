import { Request, Response } from 'express'
import User from '../models/User'

const noPasword = { password: 0 }

const userController = {
  users: async (req: Request, res: Response) => {
    try {
      const users = await User.find({}, noPasword)
      res.json(users)
    } catch (err) {
      res.sendStatus(500)
    }
  },

  createUsers: async (req: Request, res: Response) => {
    try {
      const {
        username,
        firstName,
        lastName,
        password,
        avatar,
      } = req.body as Record<string, string>
      await User.create({
        username,
        firstName,
        lastName,
        password,
        avatar,
        createdAt: Date.now(),
        updatedAt: Date.now()
      })
      res.sendStatus(201)
    } catch (err) {
      res.sendStatus(400)
    }
  },

  readUser: async (req: Request, res: Response) => {
    try {
      const user = await User.findById(req.params.id, noPasword)
      if (!user) {
        return res.sendStatus(404)
      }
      res.json(user)
    } catch (err) {
      res.sendStatus(500)
    }
  },
}

export default userController
