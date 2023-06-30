import { Profile } from '../models/profile.js'

async function isAdmin(req, res, next) {
  try {
    const profile = await Profile.findById(req.user.profile)

    if (!profile) {
      return res.status(403).send('Unauthorized access')
    }

    if (!profile.admin) {
      return res.status(403).send('Unauthorized access')
    }

    next()
  } catch (error) {
    console.log(error)
    res.status(500).send('Internal Server Error')
  }
}

function passDataToView(req, res, next) {
  res.locals.user = req.user ? req.user : null
  res.locals.googleClientID = process.env.GOOGLE_CLIENT_ID
  next()
}

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next()
  res.redirect('/')
}

export {
  passDataToView,
  isLoggedIn,
  isAdmin
}
