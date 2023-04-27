import { Char } from "../models/character.js"

function passDataToView(req, res, next) {
  res.locals.user = req.user ? req.user : null
  res.locals.googleClientID = process.env.GOOGLE_CLIENT_ID
  next()
}

function loadCharacters(req, res, next) {
  Char.find({}, (err, characters) => {
    if (err) {
      return next(err)
    }
    res.locals.characters = characters
    next()
  })
}

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next()
  res.redirect('/')
}

export {
  passDataToView,
  isLoggedIn,
  loadCharacters
}
