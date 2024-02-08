import express from 'express';
const router = express.Router();
import userController from '../controllers/UserController.js';
import authenticateUser from '../middlewares/Authenticate.js';

router.get('/api/auth', authenticateUser, userController.auth);
router.get('/api/list', authenticateUser, userController.listUrls);

router.post('/api/shorten', userController.shorten);
router.post('/api/login', userController.login);
router.post('/api/signup', userController.signup);
router.delete('/api/delete/:shortId', authenticateUser, userController.delete);

router.get('/:shortId', userController.redirect);
router.get('/api/logout', userController.logout);

export default router;