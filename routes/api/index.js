const app = require('express').Router();

const articleRoute = require('./articles');
const commentRoute = require('./comments');

app.use('/articles', articleRoute);
app.use('/comments', commentRoute);

module.exports = app;