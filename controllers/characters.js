import { Character } from "../models/character.js"

function index(req, res) {
	Character.find({})
		.then((characters) => {
			res.render('characters/index', {
				characters,
				title: "Characters",
			})
		})
		.catch(err => {
			console.log(err)
			res.redirect('/')
		})
}

function show(req, res) {
	Character.findById(req.params.characterId)
		.then((character) => {
			res.render('characters/show', {
				character: character,
				title: 'Character Details'
			})
		})
		.catch((err) => {
			console.error(err)
			res.redirect('/characters')
		})
}

export {
	index,
	create,
	show
}