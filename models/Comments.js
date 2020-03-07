const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//create the article schema
const commentsSchema = new Schema({
	title: String,
	body: String
});

//create the article model using the schema that we imported
const Comments = mongoose.model('Comments', commentsSchema);

//export our model
module.exports = Comments;