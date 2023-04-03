import { Request, Response } from 'express'

const userController = {
  create: (req: Request, res: Response) => {
    console.log(req.body)
    res.send('OK')
  }
}

export default userController
