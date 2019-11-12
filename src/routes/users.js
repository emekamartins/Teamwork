const express = require('express');

const router = express.Router();
const userController = require('../controllers/user');
const Auth = require('../middleware/auth');
const Admin = require('../middleware/isAdmin');


// Routes for users
router.post('/create-user', Admin.verifyAdminToken, userController.addUser);
router.post('/signin', userController.loginUser);
router.post('/logout', Auth.verifyToken, userController.logoutUser);
router.get('/me', Auth.verifyToken, userController.getUser);

// Routes for user articles
// router.post('/articles/new', Auth.verifyToken, articleController.createArticle);
// router.get('/articles', Auth.verifyToken, articleController.viewArticles);
// router.get('/articles/my-articles', Auth.verifyToken, articleController.viewCurrentUserArticles);
// router.put('/articles/:articleid/edit', Auth.verifyToken, articleController.editArticle);
// router.delete('/articles/:articleid/delete', Auth.verifyToken, articleController.deleteArticle);





module.exports = router;
