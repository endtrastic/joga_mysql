const express = require('express');
const app = express();

const path = require('path');

const hbs = require('express-handlebars');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/',
}));

app.use(express.static('public'))

const mysql = require('mysql2');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

var con = mysql.createConnection({
    host: "localhost",
    user: "arm",
    password: "qwerty",
    database: "joga_mysql"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected to joga_mysql db");
});

app.get('/', (req, res) => {
    let query = "SELECT * FROM article";
    let articles = []
    con.query(query, (err, result) => {
      if (err) throw err;
      articles = result
      console.log(articles)
      res.render('index',  { articles: articles });
    }) 
})

app.get('/article/:slug', (req, res) => {
  let query = `SELECT * FROM article WHERE slug = "${req.params.slug}"`;
  let article;
  con.query(query, (err, result) => {
      if (err) throw err;
      article = result;
      console.log(article);
      res.render('article', {
          article: article
      });
  });
});


app.listen(3003, () => {
  console.log('App is started at http://localhost:3003');
});