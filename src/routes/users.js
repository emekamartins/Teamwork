const express = require('express');

const router = express.Router();
const userController = require('../controllers/user');
const articleController = require('../controllers/articles');
const gifController = require('../controllers/gifs');
const Auth = require('../middleware/auth');
const Admin = require('../middleware/isAdmin');
const multerUploads = require('../middleware/multer');

//Routes for users
router.post('/admin/adduser', Admin.verifyAdminToken, userController.addUser);
router.post('/login', userController.loginUser);
router.post('/users/logout', Auth.verifyToken, userController.logoutUser);
router.get('/users/me', Auth.verifyToken, userController.getUser);

// Routes for user articles
router.post('/articles/new', Auth.verifyToken, articleController.createArticle);
router.get('/articles', Auth.verifyToken, articleController.viewArticles);
router.get('/articles/my-articles', Auth.verifyToken, articleController.viewCurrentUserArticles);
router.patch('/articles/:articleid/edit', Auth.verifyToken, articleController.editArticle);
router.delete('/articles/:articleid/delete', Auth.verifyToken, articleController.deleteArticle);


//Routes for gifs upload

router.post('/gif/upload', Auth.verifyToken, multerUploads, gifController.uploadGif)

module.exports = router;
