const express = require('express') ;
const { signUp, Login } = require('./../controllers/authController') ;

const router = express.Router () ; // create a user router .

router
    .route('/signup') 
    .post(signUp)    


module.exports = router ; 