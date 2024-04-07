import express from 'express'
import{ getMessages, sendmessage }from '../controllers/messageController.js'
import { protectRoute } from '../middleware/protectedRoute.js';

const router = express.Router()

router.get('/:id',protectRoute,getMessages)
router.post('/send/:id',protectRoute,sendmessage)

export default router;

