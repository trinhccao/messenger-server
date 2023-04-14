import { Request, Response } from 'express'
import Thread, { ThreadTypes } from '../models/Thread'
import { toDataThread } from '../helpers/thread-helper'
import { AuthorizedRequest } from '../interfaces/AuthorizedRequest'
import { DataThread } from '../interfaces/DataThread'
import User from '../models/User'

const chatController = {
  chat: async (req: Request, res: Response) => {
    try {
      const paramId = req.params.id
      const currentUserId = (req as AuthorizedRequest).user._id

      const thread = await Thread.findById(paramId)
      if (thread) {
        const threadOb = thread.toObject() as DataThread
        const convert = await toDataThread(threadOb, currentUserId)
        return res.json(convert)
      }

      const receiver = await User.findById(paramId)
      if (receiver) {
        const thread = await Thread.findOne({
          members: { $all: [currentUserId, paramId] },
          type: ThreadTypes.Direct
        })
        if (thread) {
          const threadOb = thread.toObject() as DataThread
          const convert = await toDataThread(threadOb, currentUserId)
          return res.json(convert)
        }

        const newThread = await Thread.create({
          members: [currentUserId, paramId],
          createdAt: Date.now(),
          updatedAt: Date.now(),
          type: ThreadTypes.Direct,
          scopes: ['member'],
        })
        const threadOb = newThread.toObject() as DataThread
        const convert = await toDataThread(threadOb, currentUserId)
        return res.json(convert)
      }

      res.sendStatus(400)
    } catch (err) {
      res.sendStatus(400)
    }
  }
}

export default chatController
