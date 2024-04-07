const User = require('../models/userModel') ;

 
exports.getallUser = async (req,res,next) => {

    const users = await User.find() ;
    res.status(200).json( {
        status: 'success',
        data : users 
    }) 
    next();
}