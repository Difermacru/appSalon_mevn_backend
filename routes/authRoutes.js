import express from 'express'
import { register, verifyAccount,login, user, forgotPassword,verifyPasswordResetToken,updatePassword, admin } from '../controllers/authController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

//rutas de autentificacion y registro

router.post('/register', register)
router.get('/verify/:token', verifyAccount)
router.post('/login', login)
router.post('/forgot-password', forgotPassword)
router.route('/forgot-password/:token')
    .get(verifyPasswordResetToken)//valida el nuevo token
    .post(updatePassword)//se envia el nuevo password

//area privadam-mrequiere un JWT
router.get('/user', authMiddleware, user)
router.get('/admin', authMiddleware, admin)

export default router