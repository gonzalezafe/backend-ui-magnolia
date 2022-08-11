
import express, { Response, Request, NextFunction } from 'express'
import { check, validationResult } from 'express-validator'
import Product from '../models/Product'

const router = express.Router()
/*
router.get('/', (_req, res) => {
  res.send(productServices.getProduct())
})
*/

router.get('/', (_req, res) => {
  void Product.find({}).then(products => {
    res.json(products)
  })
})
/*
router.get('/:id', (req, res) => {
  const product = productServices.findById(+req.params.id)
  return (product != null)
    ? res.send(product)
    : res.sendStatus(404)
})
*/

router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params

  Product.findById(id).then(product => {
    if (product != null) {
      return res.json(product)
    } else {
      res.status(404).end()
      return undefined
    }
  }).catch(error => {
    next(error)
  })
})

router.put('/:id', (req: Request, res: Response, _next: NextFunction) => {
  const { id } = req.params
  const product = req.body

  const newProductInfo = {
    name: product.name,
    price: product.price,
    description: product.description
  }

  void Product.findByIdAndUpdate(id, newProductInfo, { new: true }).then(result => {
    res.json(result)
  })
})

router.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params

  Product.findByIdAndRemove(id).then(_result => {
    res.status(204).end()
  }).catch(error => {
    next(error)
  })

  res.status(204).end()
})

/*
router.post('/', [
  check('name')
    .exists()
    .isString()
], (req: Request, res: Response) => {
  try {
    // const newProductEntry = toNewProductEntry(req.body)
    const addedProductEntry = productServices.addProduct(req.body)
    res.json(addedProductEntry)
  } catch (e) {
    res.status(400).send(e)
  }
})
*/
/*
router.post('/', [
  check('name')
    .exists()
    .isString()
], (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const addedProductEntry = productServices.addProduct(req.body)
  res.json(addedProductEntry)
  return undefined
})
*/

router.post('/', [
  check('name')
    .exists()
    .isString()
], (req: Request, res: Response, next: NextFunction) => {
  const product = req.body
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const newProduct = new Product({
    name: product.name,
    price: product.price,
    description: product.description
  })

  void newProduct.save().then(savedProduct => {
    res.json(savedProduct)
  }).catch(err => next(err))
  return undefined
})

router.use((_req: Request, res: Response, _next: NextFunction) => {
  res.status(404).end()
})

router.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(error)
  console.log(error.name)
  if (error.name === 'CastError') {
    res.status(400).send({ error: error.message })
  } else {
    res.status(500).end()
  }
})

export default router
