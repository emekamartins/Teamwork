
const cloudinary  = require('cloudinary').v2
const upload = require('../middleware/multer')
const pool = require('../db/database')



exports.uploadGif =  (request, response) => {
    const now = new Date()
    const title = request.body.title
    
    //multer upload function to server
    return upload(request, response, function(err){
        if (err) {
            return response.status(500).send({err})
        }

        console.log('file uploaded to server')
        console.log(request.file)

        //call cloudinary to upload file to cloud
        cloudinary.config({

            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        
        });

        const path = request.file.path
        const uniqueFilename = new Date().toISOString();


        cloudinary.uploader.upload( path,
            { public_id: `teamwork/${uniqueFilename}` },
            function(error, result){
                if(error){
                    return response.status(500).send({error})
                }

                console.log('file uploaded to Cloudinary')

                //remove uploaded file from server
                const fs = require('fs')
                fs.unlinkSync(path)

                //insert file cloudinaty link to database
                pool.query('INSERT INTO gifs (author, gif_link, created_on, gif_title) VALUES($1, $2, $3, $4)', [request.user.ID, result.url, now, title], (error, results) => {
                    if(error){
                        return response.status(500).send({error})
                    }

                    return response.status(200).send({ message: "upload successful"})
                })
            }
        )
    })
    

}


