import { Request, Response } from 'express'
import User from '../models/User'
import { verifiedRequest } from '../interfaces/VerifiedRequest'

const noPasword = { password: 0 }

const userController = {
  users: async (req: Request, res: Response) => {
    try {
      const userId = (req as verifiedRequest).user._id
      const users = await User.find({ _id: { $ne: userId } }, noPasword)

      const query = req.query.name
      if (typeof query === 'string') {
        const trimmed = query.trim()
        if (!trimmed) {
          return res.json([])
        }
        const regex = new RegExp(trimmed, 'i')
        const result = users
          .filter((user) => `${user.firstName} ${user.lastName}`.match(regex))
          .sort((a, b) => {
            const aFullName = `${a.firstName} ${a.lastName}`
            const bFullName = `${b.firstName} ${b.lastName}`
            const aIndex = aFullName.match(regex)?.index as number
            const bIndex = bFullName.match(regex)?.index as number
            return aIndex - bIndex
          })
        return res.json(result)
      }

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
