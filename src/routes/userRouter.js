const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

router.get('/api/home', userController.home);
router.get('/api/allurls', userController.allurls);

router.post('/api/shorten', userController.shorten);
router.post('/api/login', userController.login);
router.post('/api/signup', userController.signup);
router.delete('/api/delete/:shortid', userController.delete);

router.get('/:shortid', userController.reori);
router.get('/api/logout', userController.logout);

module.exports = router;