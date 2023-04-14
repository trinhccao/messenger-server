import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User'
import { DataJwtPayload } from '../interfaces/DataJwtPayload'
import { AuthorizedRequest } from '../interfaces/AuthorizedRequest'

const authController = {
  verify: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authorization = req.headers.authorization as string
      const token = authorization.replace(/^Bearer\s/, '')
      const payload = jwt.verify(token, process.env.JWT_SECRET as string)
      const request = req as AuthorizedRequest
      request.user = (payload as DataJwtPayload).user
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
      res.sendStatus(400)
    }
  }
}

export default authController
