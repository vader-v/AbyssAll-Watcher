import mongoose from 'mongoose'

const Schema = mongoose.Schema

const teamSchema = new Schema({
  name:  {
    type: String,
    required: true,
    default: "New Team",
  },
  characters: [{
    type: Schema.Types.ObjectId,
    ref: 'Character'
  }]
}, {
  timestamps: true
})


const profileSchema = new Schema({
  name: String,
  avatar: String,
  characters: [{ 
    type: Schema.Types.ObjectId,
    ref: 'Character'
  }],
  teams: [teamSchema],
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile,
}
