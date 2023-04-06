import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User'
import { IJwtPayload } from '../interfaces/IJwtPayload'
import { verifiedRequest } from '../interfaces/VerifiedRequest'

const authController = {
  authenticate: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authorization = req.headers.authorization

      if (!authorization) {
        throw new Error('Authorization empty')
      }

      const secret = process.env.JWT_SECRET as string
      const payload = jwt.verify(authorization.replace(/^Bearer\s/, ''), secret)
      const request = req as verifiedRequest
      request.user = (payload as IJwtPayload).user

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
        throw new Error()
      }

      const secret = process.env.JWT_SECRET as string
      const token = jwt.sign({ user: user.toObject() }, secret)
      res.json({ token: token, tokenType: 'Bearer', user })
    } catch (err) {
      res.header('WWW-Authenticate', 'Bearer').sendStatus(401)
    }
  }
}

export default authController
