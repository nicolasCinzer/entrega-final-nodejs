import { NotAllowedError } from '../errors/errors.js'

export const auth = roles => {
  return (req, res, next) => {
    const { role } = req.user

    if (!roles.includes(role)) return next(new NotAllowedError("Your account can't perform this action."))

    next()
  }
}
