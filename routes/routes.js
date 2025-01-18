const express = require('express');
const { handleUserRegistry, login, getProfile } = require('../controllers/user.Controller');
const { checkCredentials, validateToken, logRequest } = require('../middlewares/authMiddleware');

const router = express.Router();

// Aplicar el middleware `logRequest` globalmente a todas las rutas
router.use(logRequest);

// Rutas públicas
router.post('/usuarios', checkCredentials, handleUserRegistry); // Verifica credenciales al registrar usuario
router.post('/login', checkCredentials, login); // Verifica credenciales al iniciar sesión

// Rutas protegidas
router.get('/usuarios', validateToken, getProfile); // Valida el token para acceder al perfil

module.exports = router;
