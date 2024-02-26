import { AuthError, ValidationError } from '../errors/errors.js'
import { usersService } from '../services/users.service.js'
import { checkExpiration, readToken } from '../utils/index.js'

export const checkToken = type => {
  return async (req, res, next) => {
    const { token } = req.query

    let payload = {}

    try {
      payload = readToken(token)
    } catch (error) {
      return next(error)
    }

    const { email, exp } = payload

    const user = await usersService.findByEmail(email)

    if (type === 'view') {
      if (!user) return res.redirect('/error')

      if (checkExpiration(exp) || user.temp_token !== token) {
        req.error = 'expired-token'
      }

      return next()
    }

    if (checkExpiration(exp)) return res.redirect(`/reset/password/${user._id.toString()}?token=${token}`)

    req.payload = user

    next()
  }
}
