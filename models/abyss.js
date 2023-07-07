import mongoose from 'mongoose'
import { Rating } from './rating.js'

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
}, {
  timestamps: true
})

const levelSchema = new Schema({
  name: {
    type: String,
    enum: ['1', '2', '3'],
  },
  half1: [enemySchema],
  half2: [enemySchema],
  ratings: [Rating.schema],
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
}, {
  timestamps: true
})

const Abyss = mongoose.model('Abyss', abyssSchema)
const Enemy = mongoose.model('Enemy', enemySchema)

export {
  Abyss,
  Enemy,
  Rating
}
