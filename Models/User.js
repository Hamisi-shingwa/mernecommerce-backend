const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema;

//Creation of our user table(collection using mongoose)
const Users = new Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})
//Using of statics method to implement models method within schema

Users.statics.createAsync = async function(fullname,email,password){
    if(!fullname||!email||!password){
        throw Error("All field are required");
    }
//check if user put valid email format
    if(!validator.isEmail(email)){
   throw Error("Please put valid email format")
    }
//Check if user put valid password
  if(!validator.isStrongPassword(password)){
      throw Error("password must be strong")
  } 
//Check if email arleady exist
    const exist = await this.findOne({email})
    if(exist){
        throw Error("Email is arleady exist")
    }
//hash the entered password
const hash = await bcrypt.hash(password,10);

//then sign user to database and return what is being created
const user = await this.create({fullname,email,password:hash})
return user

}
//Create statics method for login
Users.statics.signupAsync = async function(email,password){
    if(!email||!password){
        throw Error("All field is required")
    }
//check if that email not present in db
  const exist = await this.findOne({email});
  if(!exist){
      throw Error("invalid credential")
  }
  //compare the password
  const compare =await bcrypt.compare(password,exist.password)
  if(!compare){
      throw Error("Invalid credential")
  }
  //else return exist data
  return exist;
}
module.exports = mongoose.model('user',Users)