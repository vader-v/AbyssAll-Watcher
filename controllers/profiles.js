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
      title: "Profiles"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/profiles/profile')
  })
}


function createTeam(req, res) {
  console.log(req.body )
  const team = new Team({
    name: req.body.name,
    owner: req.user._id,
    characters: [
      { character1: req.body.char1 },
      { character2: req.body.char2 },
      { character3: req.body.char3 },
      { character4: req.body.char4 },
    ]
  })
  team.save()
  .then(() => {
    console.log(team)
    Profile.findByIdAndUpdate(req.user.profile._id, { $push: { teams: team } })
    .then(() => {
      console.log(team)
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

function addTeam(req, res) {
  const teamId = req.body.teamId
  const userId = req.user._id

  Profile.findByIdAndUpdate(req.user.profile,
    { user: userId },
    { $push: { teams: teamId }
  },
    { new: true }
  )
  .populate('teams')
  .then((profile) => {
    res.redirect('/profile', {
      profile,
      teams: profile.teams,
      title: 'Profiles'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/profiles/profile')
  })
}

export {
  index,
  createTeam,
  show,
  addTeam,
}