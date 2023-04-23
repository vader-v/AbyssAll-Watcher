import { Router } from 'express'
import * as charsCtrl from '../controllers/characters.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', charsCtrl.index)
//GET localhost/characters/new 
router.get('/characters', charsCtrl.new)
//POST localhost/characters add new char on chars view
router.post('/', charsCtrl.create)
//GET localhost/characters/:charId show char details
router.get('/:charId', charsCtrl.show)

export {
  router
}
