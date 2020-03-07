const app = require('express').Router();
const commentsController = require('../../controllers/commentsController');

app
.route('/comments/:articleId')
.post(commentsController.createComment)
.get(commentsController.findComment)
.delete(commentsController.deleteComment);

module.exports = app;