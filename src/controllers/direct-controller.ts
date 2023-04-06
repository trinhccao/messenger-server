import { Request, Response } from 'express'
import { verifiedRequest } from '../interfaces/VerifiedRequest'
import Direct from '../models/Direct'

const directController = {
  directs: async (req: Request, res: Response) => {
    try {
      const user = (req as verifiedRequest).user
      const directs = await Direct.find({ users: user._id })
      res.json(directs)
    } catch (err) {
      res.sendStatus(400)
    }
  }
}

export default directController
