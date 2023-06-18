import mongoose from 'mongoose'

const Schema = mongoose.Schema

const abyssSchema = new Schema({
  title: String,
  startDate: Date,
  endDate: Date,
  content: String,
  updatedAt: Date,
})

const Abyss = mongoose.model('Abyss', abyssSchema)

export {
  Abyss
}
