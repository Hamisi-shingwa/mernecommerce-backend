const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const Post = new Schema({
    product_name:String,
    location:String,
    contact:Number,
    price:String,
    category:String,
    description:String,
    picture:String,
})

module.exports = mongoose.model('posts',Post)