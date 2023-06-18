import { Router } from 'express'
import * as abyssesCtrl from '../controllers/abysses.js'
const router = Router()

router.get('/abyss-all', abyssesCtrl.index)

export {
  router
}
