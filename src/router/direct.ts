import express from 'express'
import directController from '../controllers/direct-controller'

const direct = express.Router()

direct.get('/', directController.directs)

export default direct
