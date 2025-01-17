const express = require('express');
const { handleUserRegistry, login, getProfile } = require('../controllers/user.Controller');
const { tokenVerification } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/usuarios', handleUserRegistry);
router.post('/login', login);
router.get('/usuarios', tokenVerification, getProfile);

module.exports = router;
