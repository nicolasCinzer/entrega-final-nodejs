import { Router } from 'express'
import { saveDocuments, switchRole, deleteInactiveUsers, getAllUsers } from '../controllers/users.controller.js'
import { auth, upload } from '../middleware/index.js'
import passport from '../config/passport.js'

export const router = Router()

router.get('/users/premium/:uid', switchRole)

router.post(
  '/users/:uid/documents',
  passport.authenticate('current', { session: false, failureRedirect: '/login' }),
  upload.fields([
    { name: 'id', maxCount: 1 },
    { name: 'address', maxCount: 1 },
    { name: 'bank', maxCount: 1 }
  ]),
  saveDocuments
)

router.get('/users', passport.authenticate('current', { session: false, failureRedirect: '/login' }), auth(['admin']), getAllUsers)

router.delete('/users', passport.authenticate('current', { session: false, failureRedirect: '/login' }), auth(['admin']), deleteInactiveUsers)
