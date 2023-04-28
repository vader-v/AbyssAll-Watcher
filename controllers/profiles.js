import { Profile } from "../models/profile.js"
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
  // Find the characters from the database using their IDs
  Promise.all([
    Char.findById(char1),
    Char.findById(char2),
    Char.findById(char3),
    Char.findById(char4),
  ])
    .then((characters) => {
      // Create the team object with the given name and characters
      const newTeam = {
        name: name,
        createdBy,
        characters: characters.map((char) => char._id),
      }
    newTeam.save()
    })
  // Save the team object to the database
    .then((newTeam) => {
      // Update the user's profile to include the new team
      Profile.findByIdAndUpdate(
        createdBy._id, 
        { $push: { teams: newTeam._id } },
        { new: true }
        )
      })
        .then(() => {
          // Redirect to the user's profile page
          res.redirect('/profiles/profile')
        })
        .catch((err) => {
          console.log(err)
          res.redirect('/profiles/profile')
    })
    .catch((err) => {
      console.log(err)
      res.redirect('/profiles/profile')
    })
}

function addTeam(req, res) {
  const { name, char1, char2, char3, char4 } = req.body
  const createdBy = req.user.profile

  const newTeam = {
    name,
    characters: [char1, char2, char3, char4],
    createdBy: createdBy._id,
  }
  Profile.findByIdAndUpdate(
    req.user.profile._id,
    { $push: { teams: newTeam } },
    { new: true }
  ).then(() => {
    res.redirect('/profiles/profile')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/profiles/profile')
  })
}

function getTeam(req, res) {
  Profile.findById(req.user.profile._id)
  .then((profile) => {
      res.render('profiles/teams', {
        teams: profile.teams,
        title: 'Teams',
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
  Profile.findById(req.user.profile._id)
  .populate('teams.characters')
  .populate('teams.createdBy')
  .then(profile => {
    res.render('profiles/show-team', {
      team: profile.teams.id(teamId),
      name,
      title: 'Team Details'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/profiles/teams')
  })
}

function edit(req, res) {
  const teamId = req.params.teamId
  const name = req.user.profile.name
  Profile.findById(req.user.profile._id)
  .populate({
    path: 'teams.characters',
    model: 'Char'
  })
  .populate('teams.createdBy')
  .then(profile => {
    // Retrieve all characters from the database
    Char.find()
    .then(characters => {
      res.render('profiles/edit-team',{
        title: 'Edit Team',
        team: profile.teams.id(teamId),
        name,
        characters, // Pass all characters to the edit view
      })
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/profiles/teams')
  })
}

function updateTeam(req, res) {
  const teamId = req.params.teamId
  const name = req.body.name
  const char1 = req.body.char1
  const char2 = req.body.char2
  const char3 = req.body.char3
  const char4 = req.body.char4

  Profile.findById(req.user.profile._id)
    .then((profile) => {
      const team = profile.teams.id(teamId)

      // Update the team object with the new values
      team.name = name
      team.characters = [char1, char2, char3, char4]

      // Save the updated profile
      profile.save()
    })
    .then(() => {
      res.redirect(`/profiles/teams/${teamId}`)
    })
    .catch((err) => {
      console.log(err)
      res.redirect('/profiles/teams')
    })
}

function deleteTeam(req, res) {
  const teamId = req.body.teamId
  const userId = req.user.profile._id

  Profile.findOneAndUpdate(
    { _id: userId },
    { $pull: { teams: { _id: teamId } } },
    { new: true }
  )
  .then(() => {
    res.redirect('/profiles/teams')
  })
  .catch((err) => {
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
  showTeam,
  edit,
  updateTeam,
  deleteTeam as delete,
}
