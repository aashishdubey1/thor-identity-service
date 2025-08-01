import express from 'express'
import controller from '../controller'
import { validate } from '../middlewares/validateInputs'
import { userLoginSchema, userSchema } from '../schemas/user'
import { validateUser } from '../middlewares/validateUser'
// import { authRateLimit, loginRateLimit } from '../middlewares/rateLimiter'
const router = express.Router()
const {authController} = controller

router.post('/login',validate(userLoginSchema),authController.loginUser)
router.post('/register',validate(userSchema),authController.registerUser)
router.post('/logout',validateUser,authController.logoutUser)
router.post('/refresh',authController.refresh)

export default router