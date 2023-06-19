import { Character } from "../models/character.js"

function index(req, res) {
	const elementMappings = {
		Dendro: 'Dendro.svg',
		Anemo: 'Anemo.svg',
		Hydro: 'Hydro.svg',
		Cryo: 'Cryo.svg',
		Geo: 'Geo.svg',
		Pyro: 'Pyro.svg',
		Electro: 'Electro.svg'
	}
	const weaponMappings = {
		Sword: 'Sword.webp',
		Claymore: 'Claymore.webp',
		Catalyst: 'Catalyst.webp',
		Bow: 'Bow.webp',
		Polearm: 'Polearm.webp'
	}
	Character.find({})
		.then((characters) => {
			res.render('characters/index', {
				characters,
				title: "Characters",
				elementMappings,
				elements: Character.schema.path('element').enumValues,
				weaponMappings,
				weapons: Character.schema.path('weapon').enumValues,
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
	show
}