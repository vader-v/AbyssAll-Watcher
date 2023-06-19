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
  element: {
    type: String,
    enum: ['Pyro', 'Cryo', 'Electro', 'Geo', 'Anemo', 'Dendro', 'Hydro']
  },
  weapon: {
    type: String,
    enum: ['Claymore', 'Catalyst', 'Sword', 'Polearm', 'Bow']
  }
}, {
  timestamps: true
})

const Character = mongoose.model('Character', characterSchema)

export {
  Character
}
