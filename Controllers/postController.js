const Post = require('../Models/post')
const fileUpload = require('express-fileupload')

class PostController{
    constructor(){}

    async addPost(req, res){
     const {product_name,location,contact,price,category,description,picture} = req.body
     try{
     const data = await Post.create({
         product_name,location,contact,price,category,description,picture
     })
     res.status(200).json(data)
     }
     catch(err){
         res.status(404).json({error:err.message})
     }
    }
}
module.exports = new PostController()