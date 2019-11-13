const jwt = require('jsonwebtoken');
const pool = require('../db/database');


// Authentication for loggedIn users
const Auth = {
  async verifyToken(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const { teamId } = decodedToken;
      const { rows } = await pool.query('SELECT * FROM users WHERE users.team_id = $1 AND remember_token = $2', [teamId, token]);

      if (!rows) {
        throw Error;
      }
      if (rows[0].remember_token === null) {
        return res.status(401).send({ error: 'Unauthorized' });
      }
      const dBToken = jwt.verify(rows[0].remember_token, process.env.JWT_SECRET);
      if (dBToken.teamId !== decodedToken.teamId) {
        return res.status(401).send({ error: 'Invalid Request' });
      }

      req.token = token;
      req.user = { ID: decodedToken.teamId };
      next();
    } catch (error) {
      res.status(401).json({
        error: 'Invalid Request, Not Authorized',
      });
    }
  },

};


module.exports = Auth;
