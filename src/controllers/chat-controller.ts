import { Request, Response } from 'express'
import Thread, { ThreadTypes } from '../models/Thread'
import { toDataThread } from '../helpers/thread-helper'
import { AuthorizedRequest } from '../interfaces/AuthorizedRequest'
import { DataThread } from '../interfaces/DataThread'
import User from '../models/User'
import Message from '../models/Message'
import { DataMessage } from '../interfaces/DataMessage'

const chatController = {
  chat: async (req: Request, res: Response) => {
    try {
      const paramId = req.params.id
      const currentUserId = (req as AuthorizedRequest).user._id

      const thread = await Thread.findById(paramId)
      if (thread) {
        const threadOb = thread.toObject() as DataThread
        const convert = await toDataThread(threadOb, currentUserId)
        return res.json(convert)
      }

      const receiver = await User.findById(paramId)
      if (receiver) {
        const thread = await Thread.findOne({
          members: { $all: [currentUserId, paramId] },
          type: ThreadTypes.Direct
        })
        if (thread) {
          const threadOb = thread.toObject() as DataThread
          const convert = await toDataThread(threadOb, currentUserId)
          return res.json(convert)
        }

        const newThread = await Thread.create({
          members: [currentUserId, paramId],
          createdAt: Date.now(),
          updatedAt: Date.now(),
          type: ThreadTypes.Direct,
          scopes: ['member'],
        })
        const threadOb = newThread.toObject() as DataThread
        const convert = await toDataThread(threadOb, currentUserId)
        return res.json(convert)
      }

      res.sendStatus(400)
    } catch (err) {
      res.sendStatus(400)
    }
  },
  messages: async (req: Request, res: Response) => {
    try {
      const currentUserId = (req as AuthorizedRequest).user._id
      const threads = await Thread.find({ members: currentUserId })
      const threadIds = threads.map((item) => item.id)
      const messages = await Message.find({ threadId: threadIds })
      res.json(messages)
    } catch (err) {
      res.sendStatus(400)
    }
  },
  conversations: async (req: Request, res: Response) => {
    const currentUserId = (req as AuthorizedRequest).user._id
    const threads = await Thread.find({ members: currentUserId })
    const conversations: { thread: DataThread, messages: DataMessage[] }[] = []
    for await (const thread of threads) {
      const messages = await Message.find({
        threadId: thread._id
      }) as DataMessage[]
      const threadOb = thread.toObject() as DataThread
      const dataThread = await toDataThread(threadOb, currentUserId)
      conversations.push({
        thread: dataThread,
        messages: messages as DataMessage[]
      })
    }
    res.json(conversations)
  },
  sendMessage: async (req: Request, res: Response) => {
    try {
      const paramId = req.params.id
      const currentUserId = (req as AuthorizedRequest).user._id
      const content = req.body.message

      if (!content) {
        throw new Error('Message is empty')
      }

      let thread = await Thread.findById(paramId)
      if (!thread) {
        thread = await Thread.findOne({
          members: { $all: [paramId, currentUserId] },
          type: ThreadTypes.Direct,
        })
      }

      if (!thread) {
        throw new Error('Thread not found')
      }

      const message = await Message.create({
        threadId: thread.id,
        userId: currentUserId,
        content,
        createdAt: Date.now(),
      })

      res.json(message)
    } catch (err) {
      return res.sendStatus(400)
    }
  }
}

export default chatController
