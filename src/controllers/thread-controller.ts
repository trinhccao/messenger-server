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
      const threads = await Thread.find({ members: currentUser })

      for await (const thread of threads) {
        const threadClone = thread.toObject() as DataThread
        if (threadClone.type === ThreadTypes.Direct) {
          const receiverId = threadClone.members.find((id) => {
            return id !== currentUser._id
          })
          const receiver = await User.findById(receiverId)
          threadClone.name = `${receiver?.firstName} ${receiver?.lastName}`
          threadClone.avatar = receiver?.avatar || ''
          threadClone.slug = receiverId as string
        } else {
          threadClone.slug = thread._id.toString()
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
