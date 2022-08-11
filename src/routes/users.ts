import bcrypt from 'bcrypt'
import express, { Response, Request } from 'express'

import User from '../models/User'

const usersRouter = express.Router()

usersRouter.post('/', (req: Request, res: Response) => {
  const { body } = req
  console.log('body', req.body)
  const { username, name, password } = body
  // let passwordHash
  const saltRounds = 10
  void bcrypt.hash(password, saltRounds).then(passwordHash => {
    console.log('password', passwordHash)
    const user = new User({
      username,
      name,
      passwordHash
    })

    const savedUser = user.save()

    res.json(savedUser)

    return undefined
  })

  return undefined
})

export default usersRouter
