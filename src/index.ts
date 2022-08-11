import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import productRouter from './routes/products'
import usersRouter from './routes/users'

const app = express()
app.use(express.json()) // middleware que transforma la req.body a un json

console.log('processenvvvv', process.env)

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

app.use('/images', express.static('images')) // middleware que maneja los static, se recomienda
// tenerlas subidas a un backet y ponerle el link en la db

app.get('/ping', (_req, res) => {
  console.log('someone pinged here')
  res.send('pong')
})

app.use('/api/products', productRouter)
app.use('/api/users', usersRouter)

app.listen(PORT, () => {
  console.log('Server running on port', process.env.PORT)
})

export default app
