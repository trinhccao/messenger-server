import { Request, Response } from 'express'
import Thread, { ThreadScopes, ThreadTypes } from '../models/Thread'
import { AuthorizedRequest } from '../interfaces/AuthorizedRequest'
import User from '../models/User'
import { toDataThread } from '../helpers/thread-helper'

const chatController = {
  findThreadId: async (req: Request, res: Response) => {
    try {
      const client = (req as AuthorizedRequest).user
      const slug = req.params.slug
      const thread = await Thread.findOne({
        $or: [
          { _id: slug },
          {
            members: { $all: [client._id, slug] },
            type: ThreadTypes.Direct,
          }
        ]
      })
      if (thread) {
        return res.send(thread.id)
      }
      const user = await User.findById(slug)
      if (!user) {
        return res.sendStatus(404)
      }
      const now = Date.now()
      const newThread = await Thread.create({
        members: [client._id, user._id],
        createdAt: now,
        updatedAt: now,
        type: ThreadTypes.Direct,
        scopes: [ThreadScopes.Member],
      })
      const convert = await toDataThread(newThread, client._id)
      res.send(convert)
    } catch (err) {
      res.sendStatus(400)
    }
  }
}

export default chatController
