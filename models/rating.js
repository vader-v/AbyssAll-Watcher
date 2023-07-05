import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ratingSchema = new Schema ({
  profileId: {
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  },
  rating: {
    type: Number,
    min: 0,
    max: 3
  },
})

const Rating = mongoose.model('Rating', ratingSchema)


export {
  Rating
}