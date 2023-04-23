import { Router } from 'express'
import * as charsCtrl from '../controllers/characters.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', charsCtrl.index)
router.get('/', isLoggedIn, charsCtrl.create)

export {
  router
}
