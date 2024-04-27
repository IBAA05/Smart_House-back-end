const express = require('express');
const {control, controlLight, controltemp , controlprise ,controlgas } = require('./../controllers/deviceController')

const router = express.Router(); // create a device router .


router
    .route('/light') 
    .post(controlLight)  

router
    .route('/temp') 
    .post(controltemp)  

router
    .route('/prise') 
    .post(controlprise)  

 router
    .route('/gas') 
    .post(controlgas) 

module.exports = router;    