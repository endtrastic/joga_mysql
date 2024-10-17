// Databases connection
const con = require('../utils/db');

const AuthorsID = (req, res) => {
    const authorId = req.params.id;  // Get the author ID from the URL
  
    // Query the authors table to get the author's details
    con.query('SELECT * FROM author WHERE id = ?', [authorId], (err, authorResults) => {
        // Errori korral teate saatmine >:
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
};

module.exports = {
    AuthorsID
};