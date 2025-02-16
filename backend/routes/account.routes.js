import express from 'express'
const router = express.Router()
import authMiddleware from '../middleware.js'
import { AccountBalance, transferBalance } from '../controller/account.controller.js'


router.get('/balance',authMiddleware,AccountBalance)
router.post('/transfer',authMiddleware,transferBalance)





export default router