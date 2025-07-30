import express from 'express'
import controller from '../controller'
import { validate } from '../middlewares/validateUser'
import { userSchema } from '../schemas/user'
const router = express.Router()
const {authController} = controller

router.post('/login',authController.loginUser)
router.post('/register',validate(userSchema),authController.registerUser)
router.post('/logout',authController.logoutUser)

export default router