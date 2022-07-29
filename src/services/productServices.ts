import { NewProductEntry, ProductEntry } from '../types'
import productData from './products.json'

const products: ProductEntry[] = productData as ProductEntry[]

// export const getProduct = (): ProductEntry[] =>  products
export const getProduct = (): ProductEntry[] => {
  return products.map(({ id, name, price, description }) => {
    return {
      id,
      name,
      price,
      description
    }
  })
}

export const findById = (id: number): ProductEntry | undefined => {
  const entry = products.find(p => p.id === id)
  if (entry != null) {
    return entry
  }

  return undefined
}

export const addProduct = (newProductEntry: NewProductEntry): ProductEntry => {
  const newProduct = {
    id: Math.max(...products.map(p => p.id)) + 1,
    ...newProductEntry
  }

  products.push(newProduct)

  return newProduct
}
