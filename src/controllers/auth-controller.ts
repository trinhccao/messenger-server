import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User'

const authController = {
  authenticate: async (req: Request, res: Response, next: NextFunction) => {
    const loggedIn = true
    loggedIn ? next() : res.sendStatus(401)
  },

  login: async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body
      const user = await User.findOne({ username, password }, { password: 0 })
      if (!user) {
        return res.sendStatus(401)
      }
      const secret = process.env.JWT_SECRET as string
      const token = jwt.sign({ user: user.toObject() }, secret)
      res.json({ token: token, tokenType: 'Bearer' })
    } catch (err) {
      res.sendStatus(401)
    }
  }
}

export default authController
