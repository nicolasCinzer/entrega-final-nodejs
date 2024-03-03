import { NotAllowedError } from '../errors/errors.js'
import { productsService } from '../services/products.service.js'

export const checkProduct = async (req, res, next) => {
  const { pid } = req.params
  const { email, role } = req.user

  const product = await productsService.getProductById(pid)

  const { owner } = product

  if (role === 'premium' && owner === email) return next(new NotAllowedError("Your account can't perform this action."))

  req.product = product
  
  next()
}
