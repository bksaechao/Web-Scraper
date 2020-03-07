const app = require('express').Router();
const apiRoutes = require('./api');
const articlesController = require('../controllers/articlesController');
const commentsController = require('../controllers/commentsController');
const scrape = require('../public/assets/js/scrape')

app.use("/api", apiRoutes);

app.get('/', (req, res) => {
    res.render('index')
});

app.get('/scrape', (req, res) => {
    // let payload;
    scrape.then(scrapedArticles => {
        // console.log(scrapedArticles);
        var payload = scrapedArticles;
        res.json(payload);
    })
})

// app.get('/articles', () => {
//     articlesController.findAllArticles();
// })

app.get('/saved', (req, res) => {
    articlesController.findAllWhereSaved()
        .then((articles) => {
            res.render('saved', { articles })
        })
})

app.post('/saved', (req, res) => {
    articlesController.createArticle(req.body);
})

app.delete('/delete-article/:articleId', (req, res) => {
    articlesController.deleteArticle(req.params.articleId);
})

// comments

app.post('/comments/:articleId', (req, res) => {
    commentsController.createComment(req.params.articleId, req.body)
    .then((commentsData) => {
        res.json(commentsData);
    });
})

app.get('/comments/:articleId', (req, res) => {
    commentsController.findComment(req.params.articleId)
    .then((commentData) => {
        res.json(commentData);
    })
})

app.delete('/comments/:articleId', (req, res) => {
    commentsController.deleteComment(req.params.articleId);
})



module.exports = app;