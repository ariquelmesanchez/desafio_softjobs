const bcrypt = require('bcryptjs');
const jwt = require('../utils/jwt');
const { createUser, getUserByEmail } = require('../models/usersModel');

const handleUserRegistry = async (req, res, next) => {
  try {
    const { email, password, role, language } = req.body;

    if (!email || !password || !role || !language) {
      console.log('Campos faltantes:', { email, password, role, language });
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Contraseña encriptada:', hashedPassword);

    const user = await createUser(email, hashedPassword, role, language);
    console.log('Usuario creado:', user);

    res.status(201).json(user);
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Verificar campos
    console.log('Datos recibidos:', { email, password });
    if (!email || !password) {
      console.log('Faltan campos obligatorios');
      return res.status(400).json({ error: 'Email y contraseña son obligatorios' });
    }

    // Obtener usuario por email
    const user = await getUserByEmail(email);
    console.log('Usuario encontrado:', user);

    if (!user) {
      console.log('Usuario no encontrado con email:', email);
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('Contraseña válida:', isPasswordValid);

    if (!isPasswordValid) {
      console.log('Contraseña incorrecta para el usuario:', email);
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    // Generar token
    const token = jwt.generateToken({ email: user.email });
    console.log('Token generado:', token);

    res.json({ token });
  } catch (error) {
    console.error('Error en la ruta login:', error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

const getProfile = async (req, res, next) => {
  try {
    const { email } = req.user; // From Token
    console.log('Email obtenido del token:', email);

    const user = await getUserByEmail(email);
    console.log('Usuario encontrado en getProfile:', user);

    if (!user) {
      console.log('Usuario no encontrado en getProfile con email:', email);
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(user);
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
