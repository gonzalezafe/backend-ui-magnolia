import { Schema, model } from 'mongoose'
import { NewUserEntry } from '../types'

const userSchema = new Schema<NewUserEntry>({
  username: String,
  name: String,
  passwordHash: String
})

userSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v

    delete returnedObject.passwordHash
  }
})

// Si hay algo que no coincide ya que el modelo quedó deprecado, se usa Lamda. A IMPLEMENTAR

const User = model<NewUserEntry>('User', userSchema)

export default User
