
const gifData = (rows) => {
    const data = [];
    const cols ={};

    rows.forEach((row) => {
        cols.Id = row.id
        cols.title = row.title
        cols.url = row.url
        cols.author_firstname = row.author_firstname
        cols.author_lastname = row.author_lastname
        cols.created_on = row.created_on

        data.push(cols)

    })
    return data
}

module.exports = gifData