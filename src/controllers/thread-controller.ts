import { NextFunction, Request, Response } from 'express'
import Thread from '../models/Thread'
import { verifiedRequest } from '../interfaces/VerifiedRequest'
import ThreadMessage from '../models/ThreadMessage'

const threadController = {
  checkThreadPermission: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const thread = await Thread.findById(req.params.id)
      if (!thread) {
        return res.status(404).json({ message: 'Thread not found' })
      }
      const user = (req as verifiedRequest).user
      if (!thread.members.includes(user._id)) {
        return res.sendStatus(403)
      }
      (req as any).thead = thread
      next()
    } catch (err) {
      res.sendStatus(400)
    }
  },

  theads: async (req: Request, res: Response) => {
    try {
      const user = (req as verifiedRequest).user
      const threads = await Thread.find({ members: user._id })
      res.json(threads)
    } catch (err) {
      res.sendStatus(400)
    }
  },

  createThreads: async (req: Request, res: Response) => {
    try {
      const request = req as verifiedRequest
      const threadName = req.body.name
      const thread = await Thread.create({
        name: threadName,
        members: [request.user._id],
        createdAt: Date.now(),
        updatedAt: Date.now(),
      })
      res.json(thread)
    } catch (err) {
      res.sendStatus(400)
    }
  },

  readThread: async (req: Request, res: Response) => {
    const thread = (req as any).thead
    res.json(thread)
  },

  readTheadMessages: async (req: Request, res: Response) => {
    try {
      const messages = await ThreadMessage.find({ threadId: req.params.id })
      res.json(messages)
    } catch (err) {
      res.sendStatus(500)
    }
  },

  createTheadMessages: async (req: Request, res: Response) => {
    try {
      const user = (req as verifiedRequest).user
      await ThreadMessage.create({
        threadId: req.params.id,
        userId: user._id,
        content: req.body.message,
        createdAt: Date.now(),
      })
      res.sendStatus(201)
    } catch (err) {
      res.sendStatus(500)
    }
  }
}

export default threadController
