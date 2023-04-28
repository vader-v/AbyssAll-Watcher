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

function create(req, res) {
	const newCharacter = new Character({
		name: req.body.name,
		cardImg: req.body.image,
	})

	newCharacter.save()
		.then((character) => {
			res.redirect(`/characters/${character._id}`)
		})
		.catch(err => {
			console.log(err)
			res.redirect('/new-character')
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