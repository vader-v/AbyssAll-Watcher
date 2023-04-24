import { Router } from 'express'
import * as profCtrl from '../controllers/profiles.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

//GET localhost:3000/characters/team-creator show team creator view
router.get('/', isLoggedIn, profCtrl.index)
router.get('/characters/team-creator', isLoggedIn, profCtrl.show)

export {
  router
}