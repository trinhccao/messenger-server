import { Request, Response } from 'express'
import Thread from '../models/Thread'
import { DataThread } from '../interfaces/DataThread'
import { AuthorizedRequest } from '../interfaces/AuthorizedRequest'
import { toDataThread } from '../helpers/thread-helper'

const threadController = {
  threads: async (req: Request, res: Response) => {
    try {
      const clientId = (req as AuthorizedRequest).user._id
      const threads = await Thread.find({ members: clientId })
      
      const dataThreads: DataThread[] = []
      for await (const thread of threads) {
        const covert = await toDataThread(thread, clientId)
        covert && dataThreads.push(covert)
      }

      res.json(dataThreads)
    } catch (err) {
      res.sendStatus(400)
    }
  },
}

export default threadController
