import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User'
import { JwtPayload } from '../interfaces/JwtPayload'

const authController = {
  authenticate: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authorization = (req.headers.authorization || '')
      const secret = process.env.JWT_SECRET as string
      const payload = jwt.verify(authorization.replace(/^Bearer\s/, ''), secret)
      const request = req as any
      request.user = (payload as JwtPayload).user
      next()
    } catch (err) {
      res.header('WWW-Authenticate', 'Bearer').sendStatus(401)
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body
      const user = await User.findOne({ username, password }, { password: 0 })
      if (!user) {
        return res.header('WWW-Authenticate', 'Bearer').sendStatus(401)
      }
      const secret = process.env.JWT_SECRET as string
      const token = jwt.sign({ user: user.toObject() }, secret)
      res.json({ token: token, tokenType: 'Bearer' })
    } catch (err) {
      res.header('WWW-Authenticate', 'Bearer').sendStatus(401)
    }
  }
}

export default authController
