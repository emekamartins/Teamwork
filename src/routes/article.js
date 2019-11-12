const express = require('express');

const router = express.Router();

const articleController = require('../controllers/articles');

const commentsController = require('../controllers/comments')
const Auth = require('../middleware/auth');
const Admin = require('../middleware/isAdmin');


router.post('/', Auth.verifyToken, articleController.createArticle);
router.get('/', Auth.verifyToken, articleController.viewArticles);
router.get('/my-articles', Auth.verifyToken, articleController.viewCurrentUserArticles);
router.patch('/:articleid', Auth.verifyToken, articleController.editArticle);
router.delete('/:articleid', Auth.verifyToken, articleController.deleteArticle);
router.post('/:articleid/comments', Auth.verifyToken, commentsController.postArticleComments);
router.get('/:articleid/comments', Auth.verifyToken, articleController.viewArticleById)


module.exports = router;
