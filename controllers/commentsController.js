const db = require('../models');


module.exports = {
	findComment: (articleId) => {
		return db.Articles.findOne({ _id: articleId })
			.populate('comments')
			.lean()
			.then((data) => {
				return data;
			})
	},

	createComment: (articleId, articleNotes) => {
		return db.Comments.create(articleNotes)
			.then(insertedComment => {
				return db.Articles.findOneAndUpdate({ _id: articleId },
					{
						$push: { comments: insertedComment._id }
					})
				// const updatedData = { $push: { comments: insertedComment._id } };
				// db.Articles.findByIdAndUpdate(articleId, updatedData).then(updatedArticle => {
				// 	return updatedArticle
				// });
			});

	},

	deleteComment: (articleId) => {
		db.Comments.deleteOne({ _id: articleId });
	}
}

