import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import productRouter from './routes/products'

const app = express()
app.use(express.json()) // middleware que transforma la req.body a un json

dotenv.config()
const PORT: string = process.env.PORT ?? ''

const connectionString: string = process.env.MONGO_DB_URI ?? ''

// conexion a mongodb
mongoose.connect(connectionString)
  .then(() => {
    console.log('Database connection established')
  }).catch(err => {
    console.error(err)
  })

app.get('/ping', (_req, res) => {
  console.log('someone pinged here')
  res.send('pong')
})

app.use('/api/products', productRouter)

app.listen(PORT, () => {
  console.log('Server running on port', process.env.PORT)
})
