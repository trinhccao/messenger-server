import { DataThread } from '../interfaces/DataThread'
import { ThreadTypes } from '../models/Thread'
import User from '../models/User'

async function convertToDataThread(thread: DataThread, currentUserId: string) {
  if (thread.type === ThreadTypes.Direct) {
    const receiverId = thread.members.find((id) => {
      return id !== currentUserId
    })
    const receiver = await User.findById(receiverId)
    thread.name = `${receiver?.firstName} ${receiver?.lastName}`
    thread.avatar = receiver?.avatar || ''
    thread.slug = receiverId as string
  } else {
    thread.slug = thread._id.toString()
  }
  return thread
}

export { convertToDataThread }
