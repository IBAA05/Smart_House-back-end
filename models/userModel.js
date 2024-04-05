const mongoose = require('mongoose') ;
const validator = require('validator') ;
const bcrypt = require('bcryptjs') ;

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
        required: [true , 'Confirm your password'], 
        validate: {
            validator : function (el){
                return el === this.password ;
            },
            message: "confirm password should equal the password"
        }
    },
    rooms: {
        type : [String] 
    },
    photo: {
        type: String , 
    }
});


userSchema.pre('save', async function(next){
    // run password if the password was modified . 
    if (!this.isModified('password')) return next() ;
    
    this.password = await bcrypt.hash(this.password,12)
    this.passwordConfirm = undefined ; // to dont persiste in database .
    next() ;
});
const User =  mongoose.model('User',userSchema);


 module.exports = User ;