import { Schema, model } from 'mongoose'
import { NewProductEntry } from '../types'

const productSchema = new Schema<NewProductEntry>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true }
})

productSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Product = model<NewProductEntry>('Product', productSchema)

export default Product
