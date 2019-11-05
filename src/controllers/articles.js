
const pool = require('../db/database');
const Sanitize = require('../middleware/validation/articleValidation');

const decodeData = (rows) => {
  const data = [];
  rows.forEach((row) => {
    const originalContent = Sanitize.decode(row.content);
    const originalTitle = Sanitize.decode(row.title);
    const cols = {
      article_id: row.article_id,
      author_firstname: row.author_firstname,
      author_lastname: row.author_lastname,
      title: originalTitle,
      content: originalContent,
      created_on: row.created_on,

    };

    data.push(cols);
  });
  return data;
};


// controller to create an article
exports.createArticle = async (request, response) => {
  // PUT VALIDATION HERE..............................
  const { title, content } = request.body;

  if (!title) {
    return response.status(400).send({ error: 'Title field cannot be empty' });
  }

  if (!content) {
    return response.status(400).send({ error: 'Content field cannot be empty' });
  }

  try {
    const upperTitle = title.toUpperCase();
    const cleanTitle = Sanitize.encode(upperTitle);
    const cleanContent = Sanitize.encode(content);
    const now = new Date();
    const { rows } = await pool.query('INSERT INTO articles (author, article_title, article_content, created_on) VALUES ($1, $2, $3, $4) returning *', [request.user.ID, cleanTitle, cleanContent, now]);
    return response.status(201).send({ message: 'article created successfully', rows });
  } catch (error) {
    return response.status(501).send({ error: `article not created ${error}` });
  }
};


// controller to view all articles and searched article
exports.viewArticles = async (request, response) => {
  try {
    // query search for title if provided
    if (request.query.title) {
      const searchByTitle = `%${request.query.title.toUpperCase()}%`;
      const { rows, rowCount } = await pool.query('SELECT users.first_name as author_firstname, users.last_name as author_lastname, articles.article_id, articles.article_title as title, articles.article_content as content, articles.created_on FROM articles LEFT JOIN users ON articles.author = users.team_id WHERE articles.article_title LIKE $1', [searchByTitle]);
      if (!rows || rowCount === 0) {
        return response.status(404).send({ error: 'No articles found' });
      }
      const data = decodeData(rows);
      return response.status(200).send({ rowCount, data });
    }

    // query search for author if provided
    if (request.query.author) {
      const searchByAuthor = `%${request.query.author.toUpperCase()}%`;
      const { rows, rowCount } = await pool.query('SELECT users.first_name as author_firstname, users.last_name as author_lastname, articles.article_id, articles.article_title as title, articles.article_content as content, articles.created_on FROM articles LEFT JOIN users ON articles.author = users.team_id WHERE (users.last_name || users.first_name) LIKE $1', [searchByAuthor]);
      if (!rows || rowCount === 0) {
        return response.status(404).send({ error: 'No articles found' });
      }
      const data = decodeData(rows);
      return response.status(200).send({ rowCount, data });
    }

    if(request.query.orderBy){

      const part = request.query.orderBy.split(':');
      const columnOrder = part[0] + ' ' + part[1].toUpperCase()
      const { rows, rowCount } = await pool.query(`SELECT users.first_name as author_firstname, users.last_name as author_lastname, articles.article_id, articles.article_title as title, articles.article_content as content, articles.created_on FROM articles LEFT JOIN users ON articles.author = users.team_id ORDER BY ${columnOrder}`)
      if (!rows || rowCount === 0) {
        return response.status(404).send({ error: 'No articles found' });
      }
      
      const data = decodeData(rows);
      return response.status(200).send({ rowCount, data });
    }

    // query search for all articles
    const { rows, rowCount } = await pool.query('SELECT users.first_name as author_firstname, users.last_name as author_lastname, articles.article_title as title, articles.article_id, articles.article_content as content, articles.created_on FROM articles LEFT JOIN users ON articles.author = users.team_id');
    if (!rows || rowCount === 0) {
      return response.status(404).send({ error: 'No articles found' });
    }
    const data = decodeData(rows);
    return response.status(200).send({ rowCount, data });
  } catch (error) {
    return response.status(500).send({ error });
  }
};

// controller to view articles created by current users only
exports.viewCurrentUserArticles = async (request, response) => {
  try {
    const { rows, rowCount } = await pool.query('SELECT users.first_name as author_firstname, users.last_name as author_lastname, articles.article_id, articles.article_title as title, articles.article_content as content, articles.created_on FROM articles LEFT JOIN users ON articles.author = users.team_id WHERE articles.author = $1', [request.user.ID]);
    if (!rows || rowCount === 0) {
      return response.status(404).send({ error: 'No articles found' });
    }

    const data = decodeData(rows);
    return response.status(200).send({ rowCount, data });
  } catch (error) {
    return response.status(500).send({ error });
  }
};


// controller to edit/update a particular article
exports.editArticle = async (request, response) => {
  // PUT VALIDATION HERE..............................
  const { title, content } = request.body;
  if (!title) {
    return response.status(400).send({ error: 'Title field cannot be empty' });
  }

  if (!content) {
    return response.status(400).send({ error: 'Content field cannot be empty' });
  }
  try {
    const articleId = request.params.articleid;
    const upperTitle = title.toUpperCase();
    const cleanTitle = Sanitize.encode(upperTitle);
    const cleanContent = Sanitize.encode(content);
    const now = new Date();
    const data = await pool.query('UPDATE articles SET article_title = $1, article_content = $2, updated_on = $3 WHERE author = $4 AND article_id = $5 returning *', [cleanTitle, cleanContent, now, request.user.ID, articleId]);
    if (data.rowCount === 0) {
      return response.status(404).send({ error: 'Unauthorized access or No article found for this user' });
    }
    const { rows } = data;
    return response.status(200).send({ message: 'update Successful', rows });
  } catch (error) {
    return response.status(501).send({ error });
  }
};


exports.deleteArticle = async (request, response) => {
  try {
    const articleId = request.params.articleid;
    const data = await pool.query('DELETE FROM articles WHERE articles.article_id = $1 AND author = $2 returning *', [articleId, request.user.ID]);
    if (data.rowCount === 0) {
      return response.status(404).send({ error: 'article not found or unauthorized' });
    }
    const { rows } = data;
    return response.status(204).send({ message: 'deleted successfully', rows });
  } catch (error) {
    return response.status(500).send({ error });
  }
};


// function to decode sanitized article stored in database
