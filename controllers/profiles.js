import { name } from "ejs"
import { Profile, Team } from "../models/profile.js"
function show(req, res) {
  res.render('characters/team-creator', {
    char,
    name,
    title: "Team Creator"
  })
}
function index(req, res) {
  Profile.find({})
  .then((profiles) => {
    res.render('profile', {
      profiles,
      title: "Profiles",
      name: name,
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}
// function createTeam(req, res) {
//   const team = new Team({
//     name: req.body.name,
//     owner:req.user._id,
//     characters: [
//       req.body.char1Slot,
//       req.body.char2Slot,
//       req.body.char3Slot,
//       req.body.char4Slot,
//     ]
//   })
//   team.save()
//   .then(() => {
//     Profile.findByIdAndUpdate(req.user.profile, { $push: { teams: team } })
//     .then(() => {
//       res.redirect('/profile')
//     })
//     .catch(err => {
//       console.log(err)
//       res.redirect('/profile')
//     })
//   })
//   .catch(err => {
//     console.log(err)
//     res.redirect('/profile')
//   })
// }
export {
  index,
  // createTeam,
  show,
}