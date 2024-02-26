import jwt from 'jsonwebtoken'
import { jwtSecretKey } from '../config/config.js'

export const generateToken = (payload, expiresIn) => {
  return jwt.sign(payload, jwtSecretKey, { expiresIn })
}

export const readToken = token => {
  return jwt.verify(token, jwtSecretKey)
}
