const pool = require('../db/database');
const Sanitize =  require('../middleware/validation/sanitizeData')



exports.viewfeeds = async (request, response) => {

    try {
        
        const { rows } = await pool.query('SELECT * FROM posts LEFT JOIN articles ON posts.post_id = articles.article_post_id LEFT JOIN gifs ON posts.post_id = gifs.post_id ORDER BY post_created_on ASC')
        if(!rows){
            return response.status(400).send({
                status: "error",
                error: "invalid request"
            })
        }

        // const newData =  []
        // rows.forEach((row) => {
        //     newData.push({
        //         id: row.post_id? row.post_id : row.article_post_id,
        //         createdOn: row.created_on? row.created_on : row.article_created_on,
        //         title: row.title? row.title : row.article_title,
        //         "article/url": row.image_url? row.image_url : row.content,
        //         authorId: row.author? row.author : row.article_author

        //     })
        // })

        const newData = []
        rows.forEach((row) => {
            if(row.hasOwnProperty("image_url") && row.image_url){
                newData.push({
                    id: row.gif_id,
                    createdOn: row.created_on,
                    title: Sanitize.decode(row.title),
                    "article/url": row.image_url,
                    authorId: row.author

                })
            }
            if(row.hasOwnProperty("content") && row.content){
                newData.push({
                    id: row.article_id,
                    createdOn: row.article_created_on,
                    title: Sanitize.decode(row.article_title),
                    "article/url": Sanitize.decode(row.content),
                    authorId: row.article_author
                    
                })
            }
        })
        
            
            
    
        
    
        
        return response.status(200).send({
            status: "success",
            data: newData
        })

    } catch (error) {
        return response.status(500).send({
            status: "error",
            error: error
        })
    }
}