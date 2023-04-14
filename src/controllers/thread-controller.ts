import { Request, Response } from 'express'
import Thread, { ThreadTypes } from '../models/Thread'
import { DataThread } from '../interfaces/DataThread'
import { AuthorizedRequest } from '../interfaces/AuthorizedRequest'
import { convertToDataThread } from '../helpers/thread-helper'

const threadController = {
  threads: async (req: Request, res: Response) => {
    try {
      const currentUserId = (req as AuthorizedRequest).user._id

      const paramId = req.query.pid
      if (paramId) {
        let thread = await Thread.findById(paramId)
        if (thread) {
          const threadOb = thread.toObject() as DataThread
          const convert = await convertToDataThread(threadOb, currentUserId)
          return res.json(convert)
        }
        thread = await Thread.findOne({
          members: {
            $all: [currentUserId, paramId]
          },
          type: ThreadTypes.Direct,
        })
        if (!thread) { return res.status(404) }
        const threadOb = thread.toObject() as DataThread
        const convert = await convertToDataThread(threadOb, currentUserId)
        return res.json(convert)
      }

      const dataThreads: DataThread[] = []
      const threads = await Thread.find({ members: currentUserId })

      for await (const thread of threads) {
        const threadOb = thread.toObject() as DataThread
        const covert = await convertToDataThread(threadOb, currentUserId)
        dataThreads.push(covert)
      }

      res.json(dataThreads)
    } catch (err) {
      res.sendStatus(400)
    }
  },
}

export default threadController
