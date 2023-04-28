import { Router } from 'express'
import * as charsCtrl from '../controllers/characters.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', charsCtrl.index)
//POST localhost/characters add new char on chars view
router.post('/', isLoggedIn, charsCtrl.create)
//GET localhost/characters/:charId show char details
router.get('/:characterId', charsCtrl.show)

export {
  router
}
