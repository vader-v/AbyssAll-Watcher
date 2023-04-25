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
  const { name, char1, char2, char3, char4 } = req.body
  const createdBy = req.user.profile
  // Create the team object with the given name and characters
  const team = new Team({
    name: name,
    createdBy: createdBy._id,
    characters: [
      { character: char1 },
      { character: char2 },
      { character: char3 },
      { character: char4 }
    ]
  })

  // Save the team object to the database
  team.save()
    .then((savedTeam) => {
      // Update the user's profile to include the new team
      Profile.findByIdAndUpdate(req.user.profile._id, {
        $push: { teams: savedTeam }
      })
        .then(() => {
          // Redirect to the user's profile page
          res.redirect('/profiles/profile')
        })
        .catch((err) => {
          console.log(err)
          res.redirect('/profiles/profile')
        })
    })
    .catch((err) => {
      console.log(err)
      res.redirect('/profiles/profile')
    })
}


function addTeam(req, res) {
  const { name, char1, char2, char3, char4 } = req.body
  const createdBy = req.user.profile

  const newTeam = new Team({
    name,
    characters: [char1, char2, char3, char4],
    createdBy: createdBy._id,
  })
  newTeam.save()
    .then((team) => {
      return Profile.findOneAndUpdate(
        { user: userId },
        { $push: { teams: team._id } },
        { new: true })
        .populate('teams')
    })
    .then((profile) => {
      res.redirect('/profiles/profile')
    })
    .catch(err => {
      console.log(err)
      res.redirect('/profiles/profile')
    })
}

function getTeam(req, res) {
  Team.find({})
    .populate('createdBy.user')
    .then((teams) => {
      res.render('profiles/teams', {
        teams,
        title: 'Teams',
        req
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/profiles/teams')
    })
}
//show team details through /:teamId
function showTeam(req, res) {
  const teamId = req.params.teamId
  const name = req.user.profile.name
  
  Team.findById(teamId)
  .populate('createdBy.user')
  .then(team => {
    res.render('profiles/show-team', {
      team,
      name,
      title: 'Team Details'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/profiles/teams')
  })
}

export {
  index,
  createTeam,
  show,
  addTeam,
  getTeam,
  showTeam
}
