import { NextFunction, Request, Response } from 'express'
import Thread, { ThreadScopes, ThreadTypes } from '../models/Thread'
import { DataThread } from '../interfaces/DataThread'
import { AuthorizedRequest } from '../interfaces/AuthorizedRequest'
import { toDataThread } from '../helpers/thread-helper'
import User from '../models/User'

const threadController = {
  findAll: async (req: Request, res: Response) => {
    try {
      const dataThreads: DataThread[] = []
      const client = (req as AuthorizedRequest).user
      const threads = await Thread.find({ members: client._id })
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
  createDirect: async (req: Request, res: Response) => {
    try {
      const creator = (req as AuthorizedRequest).user
      const member = await User.findById(req.body.memberId)
      if (!member) {
        throw new Error('User not found')
      }
      const now = Date.now()
      const thread = await Thread.create({
        members: [creator._id, member._id],
        createdAt: now,
        updatedAt: now,
        type: ThreadTypes.Direct,
        scopes: [ThreadScopes.Member],
      })
      res.status(201).json(thread)
    } catch (err) {
      res.sendStatus(400)
    }
  },
  createGroup: async (req: Request, res: Response) => {
    try {
      const creator = (req as AuthorizedRequest).user
      const name = req.body.name
      if (!name || typeof name !== 'string') {
        throw new Error('Name is invalid')
      }
      const now = Date.now()
      const thread = await Thread.create({
        name: name,
        members: [creator._id],
        createdAt: now,
        updatedAt: now,
        type: ThreadTypes.Group,
        scopes: [ThreadScopes.Any],
      })
      res.status(201).json(thread)
    } catch (err) {
      res.sendStatus(400)
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
  }
}

export default threadController
