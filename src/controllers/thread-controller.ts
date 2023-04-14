import { Request, Response } from 'express'
import Thread, { ThreadTypes } from '../models/Thread'
import { DataThread } from '../interfaces/DataThread'
import { AuthorizedRequest } from '../interfaces/AuthorizedRequest'
import { toDataThread } from '../helpers/thread-helper'

const threadController = {
  threads: async (req: Request, res: Response) => {
    try {
      const currentUserId = (req as AuthorizedRequest).user._id
      const dataThreads: DataThread[] = []
      const threads = await Thread.find({ members: currentUserId })

      for await (const thread of threads) {
        const threadOb = thread.toObject() as DataThread
        const covert = await toDataThread(threadOb, currentUserId)
        dataThreads.push(covert)
      }

      res.json(dataThreads)
    } catch (err) {
      res.sendStatus(400)
    }
  },
}

export default threadController
