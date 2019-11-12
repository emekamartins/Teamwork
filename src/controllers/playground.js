const cloudinary = require('cloudinary').v2
const fs = require('fs');
const pool = require('../db/database');


exports.playground = async (request, response) => {

    cloudinary.config({

        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    
    });

    
    const newName = request.user.ID.split('-')[0]
    const uniqueFilename = newName + '-' + new Date().toISOString();
    const now = new Date()

    try {

        const { title} = request.body
        const { path } = request.file;
        const postType = "gif"
        console.log(title, path)
        if(!request.method === "POST"){
            return  response.status(405).json({
                err: `${req.method} method not allowed`
              })
        }
        console.log('testing......')
        
        const resultData = await cloudinary.uploader.upload(path,
            { public_id: `teamwork/${uniqueFilename}` },
            (error, result) => {
              if (error) {
                return response.status(500).send({ error });
              }
    
              fs.unlinkSync(path);
              console.log("uploaded")
               return result
             
        })

        console.log('reached posts')
        const postData = await pool.query('INSERT INTO posts (post_type) VALUES ($1) returning *', [postType])
        if(!postData.rows || postData.rowCount === 0){
            return response.status(500).send({message: " invalid request"})
        }
         console.log('reached gif post')
        const gifData = await pool.query('INSERT INTO gifs (author, post_id, title, image_url, created_on) VALUES ($1, $2, $3, $4, $5) returning *', [request.user.ID, postData.rows[0].post_id, title, resultData.url, now])
        if(!gifData.rows || gifData.rowCount === 0){
            return response.status(500).send({message: " invalid request"})

        }

        return response.send({ 
            status: "success",
            data: {
                gifId: gifData.rows[0].gif_id,
                message: " GIF message successfully posted",
                createdOn: gifData.rows[0].created_on,
                title: gifData.rows[0].title,
                imageUrl: gifData.rows[0].image_url

            }
        })
       
    } catch (error) {
        response.status(500).send({ error })
    }

   

}