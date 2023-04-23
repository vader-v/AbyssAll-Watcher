import { Char } from "../models/character.js"

function index(req, res) {
  Char.find({})
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

function newChar(req, res) {
  res.render('characters/new')
}

function create(req, res) {
  const newCharacter = new Char({
    name: req.body.name,
    cardImg: req.body.image,
  })

  newCharacter.save()
    .then((char) => {
      res.redirect(`/characters/${char._id}`)
    })
  .catch(err => {
    console.log(err)
    res.redirect('/new-character')
  })
}
function showChar(req, res) {
  Char.findById(req.params.id)
  .then((char) => {
    res.render('characters', { char })
  })
  .catch((err) => {
    console.error(err)
    res.redirect('/characters')
  })
}
export {
  index,
  create,
  newChar as new,
}