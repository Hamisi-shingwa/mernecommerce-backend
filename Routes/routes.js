const express = require('express');
const UserController = require('../Controllers/userController')
const PostController = require('../Controllers/postController')
const NewsData= require('../Controllers/fxData')

const Route = express.Router();

Route.post('/signin',UserController.signin)
Route.post('/signup',UserController.signup)
Route.post('/postads',PostController.addPost)
Route.get('/fxnews',NewsData.fxNews)

module.exports = Route; 