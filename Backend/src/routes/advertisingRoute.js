import express from 'express'
import { deleteAdvertisingController, getAllAdvertisingController, getOneAdvertisingController, postAdvertisingController, updateAdvertisingController } from '../controllers/advertisingController.js';

const router = express.Router()

router.get('/',getAllAdvertisingController)
router.post('/',postAdvertisingController)
router.get('/:id',getOneAdvertisingController)
router.put("/:id",updateAdvertisingController)
router.delete("/:id",deleteAdvertisingController)

export default router;


