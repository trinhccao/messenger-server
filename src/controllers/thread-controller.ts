import { NextFunction, Request, Response } from 'express'
import Thread from '../models/Thread'
import { verifiedRequest } from '../interfaces/VerifiedRequest'
import messageController from './message-controller'

const threadController = {
  verify: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const thread = await Thread.findById(req.params.id)
      if (!thread) {
        return res.sendStatus(404)
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

  create: async (req: Request, res: Response) => {
    try {
      const request = req as verifiedRequest
      const thread = await Thread.create({
        name: req.body.name,
        members: [request.user._id],
        createdAt: Date.now(),
        updatedAt: Date.now(),
      })
      res.json(thread)
    } catch (err) {
      res.sendStatus(400)
    }
  },

  get: async (req: Request, res: Response) => {
    const thread = (req as any).thead
    res.json(thread)
  },

  messages: async (req: Request, res: Response) => {
    const threadId = req.params.id
    const messages = await messageController.messages(threadId)
    res.json(messages)
  },

  createMessage: async (req: Request, res: Response) => {
    const userId = (req as verifiedRequest).user._id
    await messageController.create({
      threadId: req.params.id,
      userId,
      content: req.body.message,
      createdAt: Date.now(),
    })
    res.sendStatus(201)
  }
}

export default threadController
