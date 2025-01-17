const jwt = require('../utils/jwt');

const tokenVerification = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ error: 'Token no proporcionado' });
    }
  
    try {
      const decoded = jwt.tokenVerification(token);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ error: 'Token inválido' });
    }
  };
  
  module.exports = { tokenVerification };