import { Server as HttpServer } from 'node:http'
import { Socket, Server as SocketServer } from 'socket.io'
import { MessageSchema } from '../models/Message'
import { ThreadSchema, ThreadScopes } from '../models/Thread'
import { UserSchema } from '../models/User'

class SocketIO {
  #io: SocketServer
  #onlines: { user: UserSchema, socket: Socket }[] = []
  static instance: SocketIO

  constructor(server: HttpServer) {
    this.#io = new SocketServer(server, { cors: { origin: '*' } })
    SocketIO.instance = this
    this.#init()
  }

  #init() {
    this.#io.on('connection', (socket) => {
      const userString = socket.handshake.headers.user

      if (!userString) {
        socket.disconnect(true)
        return
      }

      const user = JSON.parse(userString as string) as UserSchema

      if (this.#onlines.find((online) => online.user._id === user._id)) {
        return socket.disconnect()
      }

      socket.emit('onlines', this.#onlines.map((item) => item.user))
      this.#notify('online', user)
      this.#onlines.push({ user: user, socket })

      socket.on('disconnect', () => {
        this.#onlines = this.#onlines.filter((item) => {
          return item.user._id !== user._id
        })
        this.#notify('offline', user)
      })
    })
  }

  #notify(event: string, user: UserSchema) {
    const sockets = this.#onlines.map((item) => item.socket)
    sockets.forEach((socket) => {
      socket.emit(event, user)
    })
  }

  dispatchChat(data: { thread: ThreadSchema, message: MessageSchema }) {
    const { thread, message } = data
    this.#onlines.forEach(({ user, socket }) => {
      if (user._id === message.userId) {
        return
      }
      if (
        thread.scopes?.includes(ThreadScopes.Public) ||
        thread.members.includes(user._id)
      ) {
        socket.emit('message', message)
      }
    })
  }
}

export default SocketIO
