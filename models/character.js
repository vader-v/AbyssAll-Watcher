import mongoose from 'mongoose'

const Schema = mongoose.Schema

const charSchema = new Schema({
  name:  {
    type: String,
    required: true,
  },
  cardImg: {
    type: String
  }
}, {
  timestamps: true
})

const Char = mongoose.model('Char', charSchema)

export {
  Char
}
