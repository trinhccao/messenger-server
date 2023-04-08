import { Server as HttpServer } from 'node:http'
import { Server as SocketServer } from 'socket.io'
import { MessageSchema } from '../models/Message'
import { ThreadSchema } from '../models/Thread'

class SocketIO {
  #io: SocketServer
  static instance: SocketIO

  constructor(server: HttpServer) {
    this.#io = new SocketServer(server, { cors: { origin: '*' } })
    SocketIO.instance = this
  }

  dispatchChat(data: { thread: ThreadSchema, message: MessageSchema, senderId: string }) {
    const { thread, senderId, message } = data
    const sockets = [...this.#io.sockets.sockets.values()]
    sockets.forEach((socket) => {
      const userid = socket.handshake.headers.userid as string
      if (!thread.members.includes(userid) || userid === senderId) {
        return
      }
      console.log(message)
      socket.emit('message', message)
    })
  }
}

export default SocketIO
