import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import router from './router/root'

dotenv.config()

const app = express()

mongoose
  .connect(`${process.env.MONGO_URI}`, {
    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PWD,
    dbName: process.env.MONGO_DB,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB error: ', err))

app.listen(process.env.APP_PORT)
app.disable('x-powered-by')
app.use(cors())
app.use(bodyParser.json())
app.use(router)
