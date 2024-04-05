const User = require('../models/userModel') ;
const jwt = require('jsonwebtoken') ;


exports.signUp = async (req,res,next) => {
    try {
        const newUser = (await User.create({
            username: req.body.username, 
            email : req.body.email  ,
            password: req.body.password  ,
            passwordConfirm : req.body.passwordConfirm , 
            rooms : req.body.rooms 
        })) ;
        const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_EXPIRES_IN})
        console.log(token) 
    
        res.status(200).json({
            message: "success" ,
            data : {
                user: newUser
            }
        })
    }catch (err) {
        res.status(404).json ({
             message : "error" , 
             data : {
               data :err.message
             }
        })
    }


}

exports.Login = async (req,res,next) => {

    // const newUser = await User.create(req.body) ;
    
}