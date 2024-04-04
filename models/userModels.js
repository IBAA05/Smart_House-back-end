const mongoose = require('mongoose') ;
const validator = require('validator')

const userSchema = new mongoose.Schema ({

    username: {
        type: String ,
        required : [true,'give us your name'] ,
        unique: true  ,
        trim: true ,    // To remove space 
    } , 
    email : {
        type: String ,
        required: [true , 'cannot log withour email'] ,
        unique: true ,
        trim: true ,
        lowercase: true , // Transform email to lowerCase
        validate: [validator.isEmail,'Invalid email']
    },
    password: {
        type: String , 
        required: [true ,'you cannot login in without password'] , 
        minlength : 8    
    },
    passwordConfirm: { 
        type: String , 
        required: [true , 'Confirm your password']
    },
    rooms: {
        type : [String] 
    },
    photo: {
        type: String , 
    }
});

const User =  mongoose.model('User',userSchema);

module.exports = User ;