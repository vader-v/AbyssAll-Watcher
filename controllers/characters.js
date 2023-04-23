import { Char } from "../models/character.js"

function index(req, res) {
  Char.find({})
  .then(movies => {
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
  res.render('characters/new', {
    title: 'Add Character'
  })
}
function create(req, res) {
  const newCharacter = new Character({
    name: req.body.name,
    cardImg: req.body.image,
  })
  newCharacter.save()
    .then((char) => {
      res.redirect('/characters')
    })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}
export {
  index,
  create,
  newChar as new,
}