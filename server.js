const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/index');
const exphbs = require('express-handlebars');

const PORT = process.env.PORT || 3001;

const app = express();

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(routes);

app.use(express.static("public"));



const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/scraper';

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

app.listen(PORT, () => {
	console.log(`PORT LISTENING ON PORT: ${PORT}`);
});