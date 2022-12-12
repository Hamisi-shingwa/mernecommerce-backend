const express = require('express');
const UserController = require('../Controllers/userController')
const PostController = require('../Controllers/postController')

const Route = express.Router();

Route.post('/signin',UserController.signin)
Route.post('/signup',UserController.signup)
Route.post('/postads',PostController.addPost)

module.exports = Route;