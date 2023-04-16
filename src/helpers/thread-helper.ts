import { DataThread } from '../interfaces/DataThread'
import { ThreadDocument, ThreadTypes } from '../models/Thread'
import User from '../models/User'

async function toDataThread(thread: ThreadDocument, clientId: string) {
  const dataThread = thread.toObject() as DataThread

  if (dataThread.type === ThreadTypes.Direct) {
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
  } else {
    dataThread.slug = dataThread._id.toString()
  }
  return dataThread
}

export { toDataThread }
