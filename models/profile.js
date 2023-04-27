import mongoose from 'mongoose'

const Schema = mongoose.Schema

const teamSchema = new Schema({
  name:  {
    type: String,
    required: true,
    default: "New Team",
  },
  createdBy: {
    type: Schema.Types.ObjectId,  
    ref: 'Profile',
  },
  characters: [{
    type: Schema.Types.ObjectId,
    ref: 'Char'
  }]
}, {
  timestamps: true
})


const profileSchema = new Schema({
  name: String,
  avatar: String,
  characters: [{ 
    type: Schema.Types.ObjectId,
    ref: 'Char'
  }],
  teams: [teamSchema],
  favorites: [{
    type: Schema.Types.ObjectId,
    ref: 'Char',
  }]
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile,
}
