const db = require('../models');

module.exports = {
	// findAllArticles: () => {
	// 	return db.Articles.find()
	// 		.populate('comments')
	// 		.lean()
	// 		.then(resultArticles => {
	// 			return resultArticles
	// 		});
	// },

	findAllWhereSaved: () => {
		return db.Articles.find()
			.lean()
			.then(resultArticles => {
				return resultArticles
			});
	},

	// findOneWhereUnsaved: (req, res) => {
	// 	db.Articles.findOne({ _id: req.params.articleId, isSaved: false })
	// 		.populate('comments')
	// 		.then(resultArticles => {
	// 			res.json(resultArticles);
	// 		});
	// },

	createArticle: (articleData) => {
		db.Articles.create(articleData);
	},

	deleteArticle: (articleId) => {
		db.Articles.deleteOne({_id: articleId}, ()=>{});
	}
}