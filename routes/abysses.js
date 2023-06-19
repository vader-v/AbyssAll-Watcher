import { Router } from 'express'
import * as abyssesCtrl from '../controllers/abysses.js'
const router = Router()

router.get('/abyss-all', abyssesCtrl.index)
router.post('/rate-abyss/:abyssId', abyssesCtrl.rateAbyss)
export {
  router
}
