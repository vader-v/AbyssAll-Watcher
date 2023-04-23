import { Char } from "../models/character.js"

function index(req, res) {
    res.render('characters/index', {
      characters,
      title: "Characters",
    })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function create(req, res) {
  req.body.owner = req.user.profile._id
  Char.create(req.body)
  .then(char => {
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
}