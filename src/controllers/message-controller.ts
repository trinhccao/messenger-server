import { Request, Response } from 'express'

const messageController = {
  getAll: async (req: Request, res: Response) => {
    res.json([])
  }
}

export default messageController
