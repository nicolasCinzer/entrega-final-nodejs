import { Schema, model } from 'mongoose'

const ticketsSchema = Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  purchase_datetime: {
    type: Date,
    default: Date.now()
  },
  amount: {
    type: Number,
    required: true
  },
  purchaser: {
    type: String,
    required: true
  },
  products: [
    {
      
    }
  ]
})

export const ticketsModel = model('Tickets', ticketsSchema)
