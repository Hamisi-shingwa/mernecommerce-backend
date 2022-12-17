require('dotenv').config()
const User = require("../Models/User")
const jwt = require('jsonwebtoken')


//create jon web token for authorization
const createToken = (_id)=>{
return jwt.sign({_id},process.env.SECRETE,{"expiresIn":"3d"})
}
class UserController {
    constructor(){};
    async signup(req, res){
    const {fullname,email,password} = req.body;
    // try to call your createSync function so us to catch all thrown error it occur
    try{
    const data = await User.createAsync(fullname,email,password)
    const json = createToken(data._id)
    res.status(200).json({data,json})
    }catch(err){
    res.status(422).json({"error":err.message})
    }
    }


    //now to create sign in methodes
    async signin(req,res){
    const {email,password} = req.body;
    try{
    const data =  await User.signupAsync(email,password)
    res.status(200).json(data)
    }catch(err){
    res.status(422).json({'error':err.message})
    }
    }
}
module.exports = new UserController();