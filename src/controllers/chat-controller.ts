import { Request, Response } from 'express'
import Thread, { ThreadTypes } from '../models/Thread'
import { AuthorizedRequest } from '../interfaces/AuthorizedRequest'

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
      if (!thread) {
        return res.sendStatus(404)
      }
      res.send(thread.id)
    } catch (err) {
      res.sendStatus(400)
    }
  }
}

export default chatController
