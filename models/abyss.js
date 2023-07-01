import mongoose from 'mongoose'

const Schema = mongoose.Schema

const enemySchema = new Schema({
  name: String,
  level: {
    type: Number,
    default: 60,
    min: 60
  },
  type: String,
  image:{
    type: String,
  }
})

const abyssSchema = new Schema({
  title: String,
  startDate: Date,
  endDate: Date,
  content: String,
  updatedAt: Date,
  ratings: [{
    type: Schema.Types.ObjectId,
    ref: 'Rating',
  }],
  enemies: [enemySchema]
})

const Abyss = mongoose.model('Abyss', abyssSchema)
const Enemy = mongoose.model('Enemy', enemySchema)

export {
  Abyss,
  Enemy
}
