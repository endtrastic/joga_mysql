// Databases connection
const con = require('../utils/db');


const GetAllArticles = (req, res) => {
    let query = "SELECT * FROM article";
    let articles = []
    con.query(query, (err, result) => {
        if (err) throw err;
        articles = result
        console.log(articles)
        res.render('index',  { articles: articles })   
    })
};

// Showing articles by slug
const GetArticlesBySlug = (req, res) => {
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
};

module.exports = {
    GetAllArticles,
    GetArticlesBySlug
};