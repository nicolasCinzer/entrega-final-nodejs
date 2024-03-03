import { productsService } from '../services/products.service.js'
import { cartsService } from '../services/carts.service.js'

const authBaseClass = 'auth'

export const renderLogin = (req, res) => {
  if (req.cookies?.token) {
    return res.redirect('/home')
  }

  const view = 'login'

  res.render(view, { baseClass: authBaseClass })
}

export const renderSignup = (req, res) => {
  if (req.cookies?.token) {
    return res.redirect('/home')
  }

  const view = 'signup'

  res.render(view, { baseClass: authBaseClass })
}

export const renderSendEmailResetPassword = (_, res) => {
  const view = 'sendEmailResetPassword'

  res.render(view, { baseClass: authBaseClass })
}

export const renderResetPasword = (req, res) => {
  const { token } = req.query
  const { error } = req

  const view = 'resetPassword'

  res.render(view, { baseClass: authBaseClass, token, error })
}

export const renderHome = async (req, res) => {
  const { id, full_name, user_initials, cart } = req.user || {}

  if (!id) {
    return res.redirect('/login')
  }

  let { limit, page, sort, ...query } = req.query

  if (query?.title === '') {
    query = {}
  }

  const products = await productsService.getProducts({ limit, page, sort, query }, true)

  const userCart = await cartsService.getCartById(cart)

  const attributes = {
    products: products.docs
      .map(product => product.toJSON())
      .map(product => ({ ...product, _id: product._id.toString(), category: product.category.replaceAll('|', ' • ') })),
    page: products.page,
    products_amount: products.totalDocs,
    totalPages: products.totalPages,
    hasPrevPage: products.hasPrevPage,
    hasNextPage: products.hasNextPage,
    user: full_name,
    user_initials,
    products_in_cart: userCart.products.length,
    cid: userCart._id.toString(),
    uid: id.toString()
  }

  let searchParams = new URLSearchParams(req.query)

  products.hasPrevPage ? (attributes['prevPage'] = `http://localhost:8080/home?page=${products.prevPage}&${searchParams}`) : null
  products.hasNextPage ? (attributes['nextPage'] = `http://localhost:8080/home?page=${products.nextPage}&${searchParams}`) : null

  res.render('home', attributes)
}

export const renderCart = async (req, res) => {
  const { cid } = req.params

  const cart = await cartsService.getCartById(cid)

  const products = cart.products
    .map(({ product, quantity }) => ({ ...product.toJSON(), quantity }))
    .map(product => ({
      ...product,
      _id: product._id.toString(),
      category: product.category.replaceAll('|', ' • '),
      price: product.price * product.quantity
    }))

  res.render('cart', {
    products
  })
}

export const renderProfile = (req, res) => {
  const { user } = req.user

  const view = 'profile'

  res.render(view, { user, baseClass: view })
}

export const renderError = (_, res) => {
  const view = 'error'

  res.render(view)
}

export const renderLoadDocuments = (req, res) => {
  const { id } = req.user

  const view = 'documents'

  res.render(view, { id })
}

export const renderChat = (_, res) => {
  res.render('chat')
}
