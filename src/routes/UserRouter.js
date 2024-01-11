import express from 'express'
const router = express.Router()
import  userController  from '../controllers/UserController.js'
import { verifyToken } from '../utils/verifyToken.js'

router.get('/api/home', userController.home);
// router.get('/api/allurls', verifyToken, userController.allurls);
router.get('/api/allurls', userController.allurls);

router.post('/api/shorten', userController.shorten);
router.post('/api/login', userController.login);
router.post('/api/signup', userController.signup);
router.delete('/api/delete/:shortid', userController.delete);

router.get('/:shortid', userController.reori);
router.get('/api/logout', userController.logout);

export default router