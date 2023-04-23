import { name } from "ejs"
import { Profile } from "../models/profile.js"

function index(req, res) {
  Profile.find({})
  .then((profiles) => {
    res.render('profiles/index', {
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

export {
  index,
}