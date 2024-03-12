// External Dependencies
import express from 'express'
import { engine } from 'express-handlebars'
import cookieParser from 'cookie-parser'

// Internal Dependencies
import Routes from '../routes/router.js'
import { errorHandler } from '../middleware/index.js'
import passport from './passport.js'
import { PORT, coockieSecretKey } from './config.js'
import '../utils/includesAll.js'
import { cwd } from '../utils/cwd.js'

export const runApp = () => {
  const app = express()

  app.use(express.json())
  app.use(express.static(cwd + '/public'))
  app.use(express.urlencoded({ extended: true }))
  app.use(cookieParser(coockieSecretKey))

  // Handlebars
  app.engine('handlebars', engine())
  app.set('view engine', 'handlebars')
  app.set('views', cwd + '/views')

  // Passport
  app.use(passport.initialize())

  // Routes
  app.use('/', Routes)

  // Errors
  app.use(errorHandler)

  // Connection
  const httpServer = app.listen(PORT, () => {
    console.log(`Server listening @ http://localhost:${PORT}`)
  })

  return httpServer
}
