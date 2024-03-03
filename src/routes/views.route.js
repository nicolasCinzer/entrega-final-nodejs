import { Router } from 'express'
import {
  renderCart,
  renderChat,
  renderHome,
  renderLogin,
  renderProfile,
  renderSignup,
  renderResetPasword,
  renderSendEmailResetPassword,
  renderError,
  renderLoadDocuments
} from '../controllers/views.controller.js'
import passport from '../config/passport.js'
import { checkToken } from '../middleware/checkToken.auth.middleware.js'

export const router = Router()

const passportOptions = { session: false, failureRedirect: '/login' }

router.get('/', (req, res) => {
  res.redirect('/home')
})

router.get('/signup', renderSignup)

router.get('/login', renderLogin)

router.get('/reset/password', renderSendEmailResetPassword)

router.get('/reset/password/:id', checkToken('view'), renderResetPasword)

router.get('/home', passport.authenticate('current', passportOptions), renderHome)

router.get('/cart/:cid', passport.authenticate('current', passportOptions), renderCart)

router.get('/profile', passport.authenticate('current', passportOptions), renderProfile)

router.get('/documents', passport.authenticate('current', passportOptions), renderLoadDocuments)

router.get('/error', renderError)

router.get('/chat', passport.authenticate('current', passportOptions), renderChat)
