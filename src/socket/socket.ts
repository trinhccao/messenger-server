import { Server, Socket } from 'socket.io'
import { createServer } from 'node:http'
import jwt from 'jsonwebtoken'
import { DataUser } from '../interfaces/DataUser'

interface DataJwtPayload {
  iat: number
  user: DataUser
}

const clients: string[] = []
const io = new Server(createServer().listen(3002), { cors: { origin: '*' } })

io.use((socket, next) => {
  try {
    const auth = socket.handshake.auth
    const secret = process.env.JWT_SECRET as string
    const payload = jwt.verify(auth.token, secret) as DataJwtPayload
    (socket as any).userId = payload.user._id
    next()
  } catch (err) {
    socket.disconnect(true)
  }
})

io.on('connection', (socket) => {
  const userId = (socket as any).userId as string
  clients.push(userId)

  io.sockets.sockets.forEach((item) => {
    const seflExcluded = clients.filter((id) => id !== (item as any).userId)
    item.emit('clients', seflExcluded)
  })

  socket.on('disconnect', () => {
    clients.splice(clients.findIndex((id) => id === userId), 1)
    io.sockets.sockets.forEach((item) => {
      const seflExcluded = clients.filter((id) => id !== (item as any).userId)
      item.emit('clients', seflExcluded)
    })
  })
})
