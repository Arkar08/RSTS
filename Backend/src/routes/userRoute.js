import express from 'express'
import { getAllUserController, paginateUserController, searchUserController, statusUserChangeController } from '../controllers/userController.js'


const router = express.Router()

router.get('/',getAllUserController)
router.post("/pagination",paginateUserController)
router.post("/search",searchUserController)
router.patch("/:id",statusUserChangeController)

export default router;