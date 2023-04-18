import { Request, Response } from 'express'
import User from '../models/User'
import { AuthorizedRequest } from '../interfaces/AuthorizedRequest'

const userController = {
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
