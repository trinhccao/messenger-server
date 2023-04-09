import { Server as HttpServer } from 'node:http'
import { Server as SocketServer } from 'socket.io'
import { MessageSchema } from '../models/Message'
import { ThreadSchema, ThreadScopes } from '../models/Thread'

class SocketIO {
  #io: SocketServer
  static instance: SocketIO

  constructor(server: HttpServer) {
    this.#io = new SocketServer(server, { cors: { origin: '*' } })
    SocketIO.instance = this
  }

  dispatchChat(data: { thread: ThreadSchema, message: MessageSchema }) {
    const { thread, message } = data
    const sockets = [...this.#io.sockets.sockets.values()]
    sockets.forEach((socket) => {
      const socketId = socket.handshake.headers.userid as string
      if (socketId === message.userId) {
        return
      }
      if (
        thread.scopes?.includes(ThreadScopes.Public) ||
        thread.members.includes(socketId)
      ) {
        socket.emit('message', message)
      }
    })
  }
}

export default SocketIO
