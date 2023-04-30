import { Profile } from "../models/profile.js"
import { Character } from "../models/character.js"


function newTeam(req, res) {
	Character.find({})
		.then(characters => {
			res.render('profiles/new', {
				characters,
				title: "Team Creator",
			})
		})
		.catch(err => {
			console.log(err)
			res.redirect('/profiles/profile')
		})
}

function show(req, res) {
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
	const {
		name,
		char1,
		char2,
		char3,
		char4
	} = req.body
	// Create the team object with the given name and characters
	// Find the characters from the database using their IDs
	Promise.all([
			Character.findById(char1),
			Character.findById(char2),
			Character.findById(char3),
			Character.findById(char4),
		])
		.then((characters) => {
			// Create the team object with the given name and characters
			const newTeam = {
				name: name,
				characters: characters.map((character) => character._id),
			}
			newTeam.save()
		})
		// Save the team object to the database
		.then((newTeam) => {
			// Update the user's profile to include the new team
			Profile.findByIdAndUpdate({
				$push: {
					teams: newTeam._id
				}
			}, {
				new: true
			})
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
	const {
		name,
		char1,
		char2,
		char3,
		char4
	} = req.body
	const newTeam = {
		name,
		characters: [char1, char2, char3, char4],
	}
	Profile.findByIdAndUpdate(
			req.user.profile._id, {
				$push: {
					teams: newTeam
				}
			}, {
				new: true
			}
		)
		.then(() => {
			res.redirect('/profiles/teams')
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
	Profile.findById(req.user.profile._id)
		.populate({
			path: 'teams.characters',
			model: 'Character'
		})
		.then(profile => {
			// Retrieve all characters from the database
			Character.find()
				.then(characters => {
					res.render('profiles/edit-team', {
						title: 'Edit Team',
						team: profile.teams.id(teamId),
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

	Profile.findOneAndUpdate({
			_id: userId
		}, {
			$pull: {
				teams: {
					_id: teamId
				}
			}
		}, {
			new: true
		})
		.then(() => {
			res.redirect('/profiles/teams')
		})
		.catch((err) => {
			console.log(err)
			res.redirect('/profiles/teams')
		})
}


export {
	show,
	createTeam,
	newTeam as new,
	addTeam,
	getTeam,
	showTeam,
	edit,
	updateTeam,
	deleteTeam as delete,
}