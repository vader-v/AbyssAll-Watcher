import { Router } from 'express'
import * as abyssesCtrl from '../controllers/abysses.js'
import { isLoggedIn, isAdmin } from '../middleware/middleware.js'

const router = Router()

router.get('/abyss-all', abyssesCtrl.index)
router.post('/rate-abyss/:abyssId', isLoggedIn, abyssesCtrl.rateAbyss)
router.get('/new-abyss', isLoggedIn, isAdmin, abyssesCtrl.newAbyss)
router.post('/new-abyss', isLoggedIn, isAdmin, abyssesCtrl.createAbyss)

export {
  router
}
