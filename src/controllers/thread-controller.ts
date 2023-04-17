import { NextFunction, Request, Response } from 'express'
import Thread, { ThreadScopes } from '../models/Thread'
import { DataThread } from '../interfaces/DataThread'
import { AuthorizedRequest } from '../interfaces/AuthorizedRequest'
import { toDataThread } from '../helpers/thread-helper'

const threadController = {
  findAll: async (req: Request, res: Response) => {
    try {
      const dataThreads: DataThread[] = []
      const client = (req as AuthorizedRequest).user
      const threads = await Thread
        .find({ members: client._id })
        .sort({ updatedAt: 'desc' })
      for await (const thread of threads) {
        const covert = await toDataThread(thread, client._id)
        covert && dataThreads.push(covert)
      }
      res.json(dataThreads)
    } catch (err) {
      res.sendStatus(400)
    }
  },
  verify: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const client = (req as AuthorizedRequest).user
      const id = req.params.id
      const thread = await Thread.findOne({
        _id: id,
        $or: [
          { scopes: ThreadScopes.Any },
          { members: client._id },
        ]
      })
      if (thread) {
        return next()
      }
      throw new Error('Thread not found')
    } catch (err) {
      res.sendStatus(403)
    }
  },
  addMessage: async (req: Request, res: Response) => {
    try {
      const content = req.body.message
      if (!content || typeof content !== 'string') {
        throw new Error('Request body invalid')
      }
      const client = (req as AuthorizedRequest).user
      const threadId = req.params.id
      const thread = await Thread.findById(threadId)
      if (!thread) {
        throw new Error('Thread not found')
      }
      thread.messages.push({
        threadId,
        userId: client._id,
        content,
        createdAt: Date.now(),
      })
      thread.updatedAt = Date.now()
      await thread.save()
      res.status(201).json(thread.messages.slice(-1)[0])
    } catch (err) {
      res.sendStatus(400)
    }
  },
  findById: async (req: Request, res: Response) => {
    try {
      const client = (req as AuthorizedRequest).user
      const id = req.params.id
      const thread = await Thread.findById(id)
      if (!thread) {
        throw new Error('Thread not found')
      }
      const convert = await toDataThread(thread, client._id)
      res.json(convert)
    } catch (err) {
      res.sendStatus(400)
    }
  }
}

export default threadController
