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
    required: true,
  },
  characters: [{
    name: String,
    type: Schema.Types.ObjectId,
    ref: 'Character'
  }]
}, {
  timestamps: true
})

const Team = mongoose.model('Team', teamSchema)

const profileSchema = new Schema({
  name: String,
  avatar: String,
  characters: [{ 
    type: Schema.Types.ObjectId,
    ref: 'Character'
  }],
  teams: {
    type: [teamSchema],
    default: [],
  },
  favorites: [{
    type: Schema.Types.ObjectId,
    ref: 'Character',
  }]
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile,
  Team
}
