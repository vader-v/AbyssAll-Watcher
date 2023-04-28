import { Router } from 'express'
import * as profCtrl from '../controllers/profiles.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/profile', isLoggedIn, profCtrl.index)
router.get('/team-creator', isLoggedIn, profCtrl.show)
router.get('/teams', isLoggedIn, profCtrl.getTeam)
router.get('/teams/:teamId', isLoggedIn, profCtrl.showTeam)
router.get('/teams/:teamId/edit-team', isLoggedIn, profCtrl.edit)
router.post('/team-creator', isLoggedIn, profCtrl.createTeam)
router.post('/teams', isLoggedIn, profCtrl.addTeam)
router.put('/teams/:teamId/edit-team', isLoggedIn, profCtrl.updateTeam)
router.delete('/teams/:teamId', profCtrl.delete)

export {
  router
}