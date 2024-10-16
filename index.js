
const express = require('express');
const app = express();
const path = require('path');
const hbs = require('express-handlebars');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/',
}));

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }));

const con = mysql.createConnection({
    host: "localhost",
    user: "arm",
    password: "qwerty",
    database: "joga_mysql"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected to your joga_mysql database :V");
});

app.get('/author/:id', (req, res) => {
    const authorId = req.params.id;  // Get the author ID from the URL
  
    // Query the authors table to get the author's details
    con.query('SELECT * FROM author WHERE id = ?', [authorId], (err, authorResults) => {
      if (err) {
        return res.status(500).send('Error retrieving author data');
      }
  
      if (authorResults.length === 0) {
        return res.status(404).send('Author not found');
      }
  
      const author = authorResults[0];  // Assuming only one author is returned
  
      // Query the articles table to get the articles by this author
      con.query('SELECT * FROM article WHERE author_id = ?', [authorId], (err, articlesResults) => {
        if (err) {
          return res.status(500).send('Error retrieving articles');
        }
  
        // Send the data to a view (replace with your template rendering logic)
        res.render('author', { 
            author: author, 
            articles: articlesResults 
          });
      });
    });
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
  let query = `SELECT article.*, author.id as author_id, author.name as author_name
      FROM article 
      JOIN author ON article.author_id = author.id 
      WHERE article.slug="${req.params.slug}"`;
  con.query(query, (err, result) => {
      if (err) throw err;
      article = result;
      res.render('article', {
          article: article
      });
  });
});


const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});