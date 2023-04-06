import { NextFunction, Request, Response } from 'express'
import { verifiedRequest } from '../interfaces/VerifiedRequest'
import Direct from '../models/Direct'
import DirectMessage from '../models/DirectMessage'

const createDirect = async (userIds: string[]) => {
  const direct = await Direct.create({
    members: userIds,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  })
  return direct
}

const directController = {
  checkPermission: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const direct = await Direct.findById(req.params.id)
      if (!direct) {
        return res.status(404).json({ message: 'Direct not found' })
      }
      const user = (req as verifiedRequest).user
      if (!direct.members.includes(user._id)) {
        return res.sendStatus(403)
      }
      next()
    } catch (err) {
      res.sendStatus(400)
    }
  },

  directs: async (req: Request, res: Response) => {
    try {
      const user = (req as verifiedRequest).user
      const directs = await Direct.find({ members: user._id })
      res.json(directs)
    } catch (err) {
      res.sendStatus(400)
    }
  },

  readDirectMessages: async (req: Request, res: Response) => {
    const directId = req.params.id
    const messages = await DirectMessage.find({ directId })
    res.json(messages)
  },

  directTo: async (req: Request, res: Response) => {
    try {
      const sender = (req as verifiedRequest).user
      const receiverId = req.params.id

      let direct = await Direct.findOne({
        members: { $all: [sender._id, receiverId] }
      })

      if (!direct) {
        direct = await createDirect([sender._id, receiverId])
      }

      await DirectMessage.create({
        directId: direct._id,
        userId: sender._id,
        createdAt: Date.now(),
        content: req.body.message,
      })

      res.sendStatus(201)
    } catch (err) {
      res.sendStatus(400)
    }
  }
}

export default directController
