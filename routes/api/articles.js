const app = require('express').Router();
const articleController = require('../../controllers/articlesController');

app
	.route('/')
	// .get(articleController.findAllArticles)

app.route('/saved')
.get(articleController.findAllWhereSaved)
.post(articleController.createArticle)
.delete(articleController.deleteArticle);

app
	.route('/:articleId')
	// .get(articleController.findOneWhereUnsaved);

module.exports = app;