import { Request, Response } from 'express'
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
  }
}

export default threadController
