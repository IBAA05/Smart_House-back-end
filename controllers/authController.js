const { Mongoose } = require('mongoose');
const User = require('../models/userModel') ;
const jwt = require('jsonwebtoken') ;
const util = require('util');


const signToken =   id => {   // To sign token to a user .
    return jwt.sign( {id:id}, process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRES_IN
    });
}


exports.signUp = async (req,res,next) => {
    try {
        const newUser = (await User.create({
            username: req.body.username, 
            email : req.body.email  ,
            password: req.body.password  ,
            passwordConfirm : req.body.passwordConfirm , 
            rooms : req.body.rooms 
        })) ;
        const token = signToken(newUser._id)
        console.log(token) 
    
        res.status(200).json({
            status: "success" ,
            token : token,
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

    const {email, password} = req.body ;

    if (!email || !password) { // existence for email and password
        return res.status(400).json({
            status : 'fail' , 
            message : 'give your password and username'
        })
    }
    
    // Look up for the user if he exists using his email and password correct .
    const user = await User.findOne({email},{_id :1 , email :1 , password : 1}) ;
    let correct ; 
    if (user){ // User must exist to compare the password and the hash one
         correct = await user.correctPassword(password,user.password)
    }else {
         correct = false ; // User doesnt exist .
    }
          if( !correct){
             return res.status(401).json({
                 status:'fail' ,
                 messsage: "Incorrect email or password"
            })
        }  
     
    // Every thing is Ok .    
    const token = signToken(user._id) ;
  
    res.json({
        status : 'success' ,
        token : token
    }) 
}


exports.protect = async (req,res,next) => {

  // 1) we get the token . 
  let token ; 
  if (req.headers.authorization  && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
  }
    
  // 2) verify the token .
  if (!token) {
      return res.status(401).json ({
          status : 'fail' ,
          message : 'you are not logged in'
        })
    }
    
    const decoded = (jwt.verify)(token,process.env.JWT_SECRET)
    console.log(decoded)
 
    // 3) check if the user still exist . 
    const existUser = await User.findById(decoded.id) ;
     if(!existUser){

        return res.status(404).json({
            status:"fail", 
            message:"token of this user doesnt exist it was removed"
        })
     }

    // 4) check if the user changed  his password after sign a token .
    if (await existUser.changedPasswordAfter(decoded.iat)) {
         console.log("decode ", decoded.iat) 
        res.status(404).json({
            status:'fail', 
            message: 'User changed recently password login again'
        })
     } 

    // Give access to prottect middlware (finish of authencation) 
    req.user = existUser ;
    next() ;
}

exports.forgetPassword = async(req, res, next) => {
    
    // 1) geting user based on his email and if the user exist . 
    const user = await User.findOne({ email: req.body.email });
    console.log('def')
    if (user) {
        res.status(404).json({
            status: 'fail', 
            message: 'cannot find user with this email'
        })
    }

    // 2) generate reset token

    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false }); // we save a user to database beacuase we modify it .
    next()
}

exports.resetPassword = (req, res, next) => {
    
}