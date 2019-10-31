const pool = require('../db/database');
const Validation = require('../middleware/userValidation');


// create User Controller
exports.addUser = async (request, response) => {
  const {
    roleId, firstName, lastName, password, email,
  } = request.body;
  const now = new Date();

  if (!email || !password) {
    return response.status(400).send({ message: 'Some values are missing' });
  }

  if (!Validation.passwordLength(password.length)) {
    return response.status(400).send({ message: 'Password is too short' });
  }

  if (!Validation.isValidEmail(email)) {
    return response.status(400).send({ message: 'Please enter a valid email address' });
  }
  const hashPassword = Validation.hashPassword(password);

  return pool.query('INSERT INTO users (role_id, first_name, last_name, password, email, created_on) VALUES ($1, $2, $3, $4, $5, $6)', [roleId, firstName, lastName, hashPassword, email, now], (error) => {
    if (error) {
      if (error.routine === '_bt_check_unique') { return response.status(500).send({ message: 'email already exist' }); }
      return response.status(501).json({ error });
    }
    return response.status(201).json({ status: 'success', message: 'user added.' });
  });
};


// login controller
exports.loginUser = async (request, response) => {
  const { email, password } = request.body;

  if (!email || !password) {
    return response.status(400).send({ message: 'Some values are missing' });
  }

  return pool.query('SELECT * FROM users WHERE users.email = $1', [email], (error, results) => {
    if (error) {
      return response.status(500).json({ error });
    }
    if (!results.rows[0]) { return response.status(500).json({ message: 'email or password is incorrect' }); }

    if (!Validation.comparePassword(results.rows[0].password, password)) {
      return response.status(400).send({ message: ' email or password is incorrect' });
    }

    const token = Validation.generateToken(results.rows[0].user_id);
    return response.status(200).send({ 
      message: results.rows,
      token: token });
  });
};


// exports.getUser = (request, response) => {

// };

// exports.updateUser = (request, response) => {

// };

// exports.deleteUser = (request, response) => {

// };
