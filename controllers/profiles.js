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
  console.log(req.body)
  const { name, char1, char2, char3, char4 } = req.body
  console.log(req.body)
  // Create the team object with the given name and characters
  const team = new Team({
    name: name,
    owner: req.user._id,
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
      console.log(req.body)
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
  const teamName = req.body.teamName
  const characterIds = req.body.characters
  const team = new Team({
    name: teamName,
    owner: req.user.profile,
    characters: characterIds
  })
  //save team to database
  team.save()
  .then((savedTeam) => {
    return Profile.findByIdAndUpdate(req.user.profile,{ $push: { teams: savedTeam._id }
    },
      { new: true })
    .populate('teams')
  })
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