import { NextFunction, Request, Response } from 'express'
import Thread, { ThreadScopes, ThreadTypes } from '../models/Thread'
import { verifiedRequest } from '../interfaces/VerifiedRequest'
import messageController from './message-controller'

const chatController = {
  getThread: async (req: Request, res: Response) => {
    try {
      const targetId = req.params.id

      const group = await Thread.findById(targetId)
      if (group) {
        return res.json(group)
      }

      const userId = (req as verifiedRequest).user._id
      if (targetId === userId) {
        throw new Error('Your self')
      }
      const direct = await Thread.findOne({
        members: {
          $all: [userId, targetId]
        },
        type: ThreadTypes.Direct,
      })
      if (direct) {
        return res.json(direct)
      }

      res.json(null)
    } catch (err) {
      res.sendStatus(400)
    }
  },

  verify: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as verifiedRequest).user._id
      const thread = await Thread.findById(req.params.id)
      if (!thread) {
        return res.sendStatus(400)
      }
      if (
        !thread.members.includes(userId) &&
        !thread.scopes?.includes(ThreadScopes.Public)
      ) {
        return res.sendStatus(403)
      }
      next()
    } catch (err) {
      res.sendStatus(400)
    }
  },

  createMessage: async (req: Request, res: Response) => {
    try {
      const userId = (req as verifiedRequest).user._id
      const thread = await Thread.findById(req.params.id)
      const messageContent = req.body.message

      if (!thread || !messageContent) {
        return res.sendStatus(400)
      }

      const message = await messageController.create({
        threadId: thread.id,
        userId,
        content: messageContent,
        createdAt: Date.now(),
      })

      thread.updatedAt = Date.now()
      thread.save()

      res.status(201).json(message)
    } catch (err) {
      res.sendStatus(500)
    }
  }
}

export default chatController
