import { name } from "ejs"
import { Profile, Team } from "../models/profile.js"
import { Char } from "../models/character.js"

function show(req, res) {
  Char.find({})
  .then(characters => {
    res.render('profiles/team-creator', {
      characters,
      title: "Team Creator",
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/profiles/profile')
  })
}
function index(req, res) {
  Profile.findById(req.user.profile)
  .populate('teams')
  .then((profile) => {
    res.render('profiles/profile', {
      profile,
      teams: profile.teams,
      name,
      title: "Profiles"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/profiles/profile')
  })
}


function createTeam(req, res) {
  const team = new Team({
    name: req.body.name,
    owner:req.user._id,
    characters: [
      { character1: req.body.char1Slot },
      { character2: req.body.char2Slot },
      { character3: req.body.char3Slot },
      { character4: req.body.char4Slot },
    ]
  })
  team.save()
  .then(() => {
    Profile.findByIdAndUpdate(req.user.profile, { $push: { teams: team } })
    .then(() => {
      res.redirect('/profile')
    })
    .catch(err => {
      console.log(err)
      res.redirect('/profile')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/profile')
  })
}

export {
  index,
  createTeam,
  show,
}