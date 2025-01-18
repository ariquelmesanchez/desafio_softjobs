const jwt = require('../utils/jwt');

// Middleware para verificar la existencia de credenciales
const checkCredentials = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    console.log('Credenciales faltantes:', { email, password });
    return res.status(400).json({ error: 'Credenciales son obligatorias' });
  }

  console.log('Credenciales verificadas:', { email });
  next();
};

// Middleware para validar el token en las cabeceras
const validateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    console.log('Token faltante');
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.tokenVerification(token);
    console.log('Token válido para usuario:', decoded.email);
    req.user = decoded; // Añade el usuario decodificado al objeto `req`
    next();
  } catch (error) {
    console.error('Error al validar el token:', error);
    return res.status(401).json({ error: 'Token inválido' });
  }
};

// Middleware para registrar consultas en el servidor
const logRequest = (req, res, next) => {
  const { method, url } = req;
  const timestamp = new Date().toISOString();

  console.log(`[${timestamp}] ${method} ${url}`);
  next();
};

module.exports = { checkCredentials, validateToken, logRequest };
