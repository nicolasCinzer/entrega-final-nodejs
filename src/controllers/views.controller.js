import { viewsService } from '../services/views.service.js'

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

  const renderVariables = await viewsService.buildProductsRender({ queryOpt: { limit, page, sort, query }, full_name, user_initials, cart })

  res.render('home', renderVariables)
}

export const renderCart = async (req, res) => {
  const { id, full_name, user_initials, cart } = req.user || {}

  if (!id) {
    return res.redirect('/login')
  }

  const renderVariables = await viewsService.buildCartRender({ full_name, user_initials, cart })

  res.render('cart', renderVariables)
}

export const renderPurchase = async (req, res) => {
  const { id, full_name, user_initials, cart } = req.user || {}

  if (!id) {
    return res.redirect('/login')
  }

  const renderVariables = await viewsService.buildCartRender({ full_name, user_initials, cart })

  res.render('purchase', renderVariables)
}

export const renderTicket = async (req, res) => {
  const { id, full_name, user_initials, cart, email } = req.user || {}

  if (!id) {
    return res.redirect('/login')
  }

  const renderVariables = await viewsService.buildTicketRender({ full_name, user_initials, cart, email })

  res.render('ticket', renderVariables)
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
