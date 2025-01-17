const bcrypt = require('bcryptjs');
const jwt = require('../utils/jwt');
const { createUser, getUserByEmail } = require('../models/usersModel');

const handleUserRegistry = async (req, res, next) => {
  try {
    const { email, password, rol, lenguage } = req.body;

    if (!email || !password || !rol || !lenguage) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await createUser(email, hashedPassword, rol, lenguage);

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son obligatorios' });
    }

    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    const token = jwt.generateToken({ email: user.email });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

const getProfile = async (req, res, next) => {
  try {
    const { email } = req.user; // Email extraído del token

    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Filtrar solo los datos requeridos y devolver en formato array
    const { rol, lenguage } = user;
    res.json([{ email, rol, lenguage }]);
  } catch (error) {
    console.error('Error al obtener el perfil:', error);
    res.status(500).json({ error: 'Error al obtener el perfil' });
  }
};

module.exports = {
  handleUserRegistry,
  login,
  getProfile,
};
