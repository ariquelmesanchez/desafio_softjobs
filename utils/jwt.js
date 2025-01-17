const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
// console.log('JWT_SECRET:', secret); // Agrega esto para verificar

// if (!secret) {
//     console.error('No se ha definido JWT_SECRET');
// }

const generateToken = (payload) => {
    return jwt.sign(payload, secret, { expiresIn: '30d'});
};

const tokenVerification = (token) => {
    return jwt.verify(token, secret);
};

module.exports = {
    generateToken,
    tokenVerification
};