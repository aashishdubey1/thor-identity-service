import express from 'express'
import controller from '../controller'
const router = express.Router()
const {authController} = controller

router.post('/login',authController.loginUser)
router.post('/register',authController.registerUser)
router.post('/logout',authController.logoutUser)

export default router