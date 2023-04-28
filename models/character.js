import mongoose from 'mongoose'

const Schema = mongoose.Schema

const characterSchema = new Schema({
  name:  {
    type: String,
    required: true,
  },
  cardImg: {
    type: String
  },
  details: {
    type: String
  },
}, {
  timestamps: true
})

const Character = mongoose.model('Character', characterSchema)

export {
  Character
}
