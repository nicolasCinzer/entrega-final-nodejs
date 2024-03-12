import { runApp } from './config/server.js'
import { connectDB } from './config/connectDB.js'

const start = () => {
  runApp()

  connectDB()
}

start()
