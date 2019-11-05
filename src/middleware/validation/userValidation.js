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
      teamId: id,
    },
    process.env.JWT_SECRET, { expiresIn: '6h' });
    return token;
  },

  hidePrivateData(user) {
    const rows = { ...user };
    delete rows[0].password;
    if (rows[0].remember_token) {
      delete rows[0].remember_token;
    }
    return rows;
  },

};

module.exports = Validation;
