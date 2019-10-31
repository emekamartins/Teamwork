const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Validation = {

  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  },

  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },

  passwordLength(passwordLength) {
    return passwordLength >= 7;
  },

  isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  },

  generateToken(id) {
    const token = jwt.sign({
      userId: id,
    },
    'thistokenformyapp', { expiresIn: '1d' });
    return token;
  },

};

module.exports = Validation;
