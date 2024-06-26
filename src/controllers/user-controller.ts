import { Request, Response } from 'express'
import User from '../models/User'
import { AuthorizedRequest } from '../interfaces/AuthorizedRequest'

const userController = {
  create: async (req: Request, res: Response) => {
    try {
      const data = {
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        avatar: req.body.avatar,
        createdAt: Date.now(),
        updatedAt: Date.now()
      }
      await User.create(data)
      res.sendStatus(201)
    } catch (err) {
      res.sendStatus(400)
    }
  },

  user: async (req: Request, res: Response) => {
    try {
      const user = await User.findById(req.params.id, { password: 0 })
      if (!user) {
        return res.sendStatus(404)
      }
      res.json(user)
    } catch (err) {
      res.sendStatus(400)
    }
  },

  users: async (req: Request, res: Response) => {
    try {
      const client = (req as AuthorizedRequest).user
      const users = await User.find(
        { _id: { $ne: client._id } },
        { password: 0 }
      )
      res.json(users)
    } catch (err) {
      res.sendStatus(400)
    }
  },
}

export default userController
