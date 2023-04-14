import { Request, Response } from 'express'
import Thread, { ThreadTypes } from '../models/Thread'
import { DataThread } from '../interfaces/DataThread'
import User from '../models/User'
import { AuthorizedRequest } from '../interfaces/AuthorizedRequest'

const threadController = {
  threads: async (req: Request, res: Response) => {
    try {
      const currentUser = (req as AuthorizedRequest).user
      const dataThreads: DataThread[] = []
      const threads = await Thread.find({ members: currentUser._id })

      for await (const thread of threads) {
        const threadClone = thread.toObject() as DataThread
        if (threadClone.type === ThreadTypes.Direct) {
          const id = threadClone.members.find((id) => id !== currentUser._id)
          const receiver = await User.findById(id)
          threadClone.name = `${receiver?.firstName} ${receiver?.lastName}`
          threadClone.avatar = receiver?.avatar || ''
        }
        dataThreads.push(threadClone)
      }

      res.json(dataThreads)
    } catch (err) {
      res.sendStatus(400)
    }
  },
}

export default threadController
