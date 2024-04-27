const express = require('express') ;
const { signUp, Login } = require('./../controllers/authController') ;
const authController = require('./../controllers/authController')
const {getallUser} = require('./../controllers/userController')

const router = express.Router () ; // create a user router .

router
    .route('/signup') 
    .post(signUp)    

router
    .route('/login')
    .post(Login)
router
    .route('/')
    .get( getallUser) 
router
    .post('/forgetPassword',authController.forgetPassword)       
router
    .route('/resetPassword')
    .post(authController.resetPassword)     
module.exports = router ; 