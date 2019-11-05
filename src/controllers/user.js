const uuid4 = require('uuid/v4');
const pool = require('../db/database');
const Validation = require('../middleware/validation/userValidation');
const uuid = uuid4();


// create User Controller
exports.addUser = async (request, response) => {
  const {
    roleId, firstName, lastName, password, email,
  } = request.body;
  const now = new Date();
  const upperFirstName = firstName.toUpperCase();
  const upperLastName = lastName.toUpperCase();

  if (!email || !password) {
    return response.status(400).send({ error: 'Some values are missing' });
  }

  if (!Validation.passwordLength(password.length)) {
    return response.status(400).send({ error: 'Password is too short' });
  }

  if (!Validation.isValidEmail(email)) {
    return response.status(400).send({ error: 'Please enter a valid email address' });
  }
  const hashPassword = Validation.hashPassword(password);

  return pool.query('INSERT INTO users (role_id, first_name, last_name, password, email, created_on, team_id) VALUES ($1, $2, $3, $4, $5, $6, $7)', [roleId, upperFirstName, upperLastName, hashPassword, email, now, uuid], (error) => {
    if (error) {
      if (error.routine === '_bt_check_unique') { return response.status(500).send({ message: 'email already exist' }); }
      return response.status(501).json({ error });
    }
    return response.status(201).json({ status: 'success', message: 'user added.' });
  });
};


// login controller
exports.loginUser = (request, response) => {
  const { email, password } = request.body;
  const now = new Date();
  if (!email || !password) {
    return response.status(400).send({ error: 'Some values are missing' });
  }
  try {
    return pool.query('SELECT * FROM users WHERE users.email = $1', [email], (error, results) => {
      if (error) {
        return response.status(500).json({ error });
      }

      if (!results.rows[0]) { return response.status(500).json({ error: 'email or password is incorrect' }); }

      if (!Validation.comparePassword(results.rows[0].password, password)) {
        return response.status(400).send({ error: ' email or password is incorrect' });
      }

      const token = Validation.generateToken(results.rows[0].team_id);

      pool.query('UPDATE users SET remember_token = $1, updated_on = $2 WHERE team_id = $3', [token, now, results.rows[0].team_id]);
      return response.status(200).send({
        data: Validation.hidePrivateData(results.rows),
        token,
      });
    });
  } catch (error) {
    return response.status(500).send({ error });
  }
};


// logout controller
exports.logoutUser = async (request, response) => {
  try {
    const now = new Date();
    const { rows } = await pool.query('SELECT * FROM users WHERE team_id = $1', [request.user.ID]);

    if (!rows) {
      return response.status(500).send({ error: 'Invalid request' });
    }
    let { data = rows } = await pool.query('UPDATE users SET remember_token = $1, updated_on = $2 WHERE team_id = $3 returning *', [null, now, rows[0].team_id]);
    data = Validation.hidePrivateData(data);
    return response.status(200).send({ message: 'logged Out', data });
  } catch (error) {
    return response.status(500).send({ error });
  }
};


exports.getUser = async (request, response) => {
  try {
    const { rows } = await pool.query('SELECT * FROM users WHERE team_id = $1', [request.user.ID]);

    if (!rows) {
      return response.status(500).send({ error: 'Invalid request' });
    }
    return response.status(200).json({ data: Validation.hidePrivateData(rows) });
  } catch (error) {
    return response.status(500).send({ error: 'invalid request' });
  }
};

// exports.updateUser = (request, response) => {

// };

// exports.deleteUser = (request, response) => {

// };
