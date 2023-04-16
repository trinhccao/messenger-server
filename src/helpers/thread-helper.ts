import { Document } from 'mongoose'
import { DataThread } from '../interfaces/DataThread'
import { ThreadTypes } from '../models/Thread'
import User from '../models/User'

async function toDataThread(thread: Document, clientId: string) {
  const dataThread = thread.toObject() as DataThread

  switch (dataThread.type) {
    case ThreadTypes.Direct: {
      const receiverId = dataThread.members.find((id) => id !== clientId)
      if (!receiverId) {
        return
      }
      const receiver = await User.findById(receiverId)
      if (!receiver) {
        return
      }
      dataThread.name = `${receiver.firstName} ${receiver.lastName}`
      dataThread.avatar = receiver.avatar
      dataThread.slug = receiverId
      break
    }
    case ThreadTypes.Group: {
      dataThread.slug = dataThread._id.toString()
      break
    }
    default: {
      return
    }
  }

  return dataThread
}

export { toDataThread }
