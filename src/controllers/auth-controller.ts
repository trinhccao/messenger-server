import { Request, Response, NextFunction } from 'express'

const authController = {
  authenticate: async (req: Request, res: Response, next: NextFunction) => {
    const loggedIn = true
    loggedIn ? next() : res.sendStatus(401)
  },

  login: async (req: Request, res: Response) => {
    res.send('Login')
  }
}

export default authController
