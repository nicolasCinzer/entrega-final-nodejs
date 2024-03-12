import { Router } from 'express'
import { getProducts, getProductByID, createProduct, updateProduct, deleteProduct, mockingProducts } from '../controllers/products.controller.js'
import passport from 'passport'
import { auth, rolePermission } from '../middleware/index.js'

export const router = Router()

router.get('/products', getProducts)

router.get('/products/:pid', getProductByID)

router.post('/products', passport.authenticate('current', { session: false }), auth(['admin', 'premium']), createProduct)

router.put('/products/:pid', passport.authenticate('current', { session: false }), auth(['admin', 'premium']), rolePermission, updateProduct)

router.delete('/products/:pid', passport.authenticate('current', { session: false }), auth(['admin', 'premium']), rolePermission, deleteProduct)

router.get('/mockingproducts', mockingProducts)
