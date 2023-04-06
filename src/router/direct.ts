import express from 'express'
import directController from '../controllers/direct-controller'

const direct = express.Router()

direct.get('/', directController.directs)
direct.post('/to/:id', directController.directTo)
direct.use('/:id', directController.checkPermission)
direct.get('/:id/messages', directController.readDirectMessages)

export default direct
