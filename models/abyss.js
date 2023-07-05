import mongoose from 'mongoose'
import ratingSchema from './rating.js'

const Schema = mongoose.Schema

const enemySchema = new Schema({
  name: String,
  level: {
    type: Number,
    default: 60,
    min: 60,
    max: 120
  },
  type: String,
  image:{
    type: String,
  }
})

const levelSchema = new Schema({
  half1: [enemySchema],
  half2: [enemySchema],
  ratings: [ratingSchema],
})

const floorSchema = new Schema({
  name: {
    type: String,
    enum: ['9', '10', '11', '12']
  },
  levels: [levelSchema],
})

const abyssSchema = new Schema({
  title: String,
  startDate: Date,
  endDate: Date,
  content: String,
  updatedAt: Date,
  floors: [floorSchema],
})

const Abyss = mongoose.model('Abyss', abyssSchema)
const Enemy = mongoose.model('Enemy', enemySchema)

export {
  Abyss,
  Enemy
}
