const User = require('./../models/userModels') ;



exports.signUp = async (req,res,next) => {
    try {
        const newUser = await User.create(req.body) ;
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