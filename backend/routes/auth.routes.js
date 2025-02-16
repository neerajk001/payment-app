import express from 'express'
const router = express.Router()
import { signup,signin, updateBody,getBulk } from '../controller/auth.controller.js';
import { authMiddleware } from '../utils/middleware.js';
import { AccountBalance } from '../controller/account.controller.js';

router.post('/signup', signup);
router.post('/signin',signin);
router.put('/update',authMiddleware,updateBody)
router.get('/bulk',getBulk)
// router.post('/balance',AccountBalance)









export default router
