import { Router } from 'express'
import {
  createCart,
  getCartByID,
  addProductToCart,
  addMultipleProductsToCart,
  deleteAllProductsFromCart,
  updateProductQty,
  deleteProductFromCart,
  purchase
} from '../controllers/carts.controller.js'
import { checkCart, checkProduct } from '../middleware/index.js'
import passport from '../config/passport.js'

export const router = Router()

const passportMiddleware = passport.authenticate('current', { session: false })

router.post('/carts', passportMiddleware, checkCart, createCart)

router.get('/carts/:cid', passportMiddleware, checkCart, getCartByID)

router.post('/carts/:cid', passportMiddleware, checkCart, addMultipleProductsToCart)

router.delete('/carts/:cid', passportMiddleware, checkCart, deleteAllProductsFromCart)

router.post('/carts/:cid/product/:pid', passportMiddleware, checkCart, checkProduct, addProductToCart)

router.put('/carts/:cid/product/:pid', passportMiddleware, checkCart, updateProductQty)

router.delete('/carts/:cid/product/:pid', passportMiddleware, checkCart, deleteProductFromCart)

router.post('/carts/:cid/purchase', passportMiddleware, checkCart, purchase)
