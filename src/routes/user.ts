import express from 'express'
import controller from '../controller'

const router = express.Router()
const {userController} = controller

router.get('/',userController.getUser)

router.put('/:id',userController.updateUser)

router.delete('/:id',userController.deleteUser)

export default router