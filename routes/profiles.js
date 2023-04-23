import { Router } from 'express'
import * as profCtrl from '../controllers/profiles.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

//GET localhost:3000/characters/team-creator show team creator view
router.get('/', isLoggedIn, profCtrl.index)

export {
  router
}