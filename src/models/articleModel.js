const Sanitize = require('../middleware/validation/sanitizeData');

const articleData = (rows) => {
  const data = [];
  const cols = {};
  rows.forEach((row) => {
    const originalContent =  Sanitize.decode(row.content);
    const originalTitle =  Sanitize.decode(row.title);
    
      cols.article_id = row.article_id,
      cols.author_firstname = row.author_firstname,
      cols.author_lastname = row.author_lastname,
      cols.title = originalTitle,
      cols.content = originalContent,
      cols.created_on = row.created_on

    data.push(cols);
  });
  return data;
};

module.exports = articleData;









// const decodeData = (rows) => {
//   const data = [];
//   rows.forEach((row) => {
//     const originalContent =  Sanitize.decode(row.content);
//     const originalTitle =  Sanitize.decode(row.title);
//     const cols = {
//       article_id: row.article_id,
//       author_firstname: row.author_firstname,
//       author_lastname: row.author_lastname,
//       title: originalTitle,
//       content: originalContent,
//       created_on: row.created_on,

//     };

//     data.push(cols);
//   });
//   return data;
// };