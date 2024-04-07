const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'give us your name'],
    unique: true,
    trim: true, // To remove space
  },
  email: {
    type: String,
    required: [true, 'cannot log withour email'],
    unique: true,
    trim: true,
    lowercase: true, // Transform email to lowerCase
    validate: [validator.isEmail, 'Invalid email'],
  },
  role: {
    type: String,
    enum: ['user', 'admin'], // Predefined user roles .
    default : 'user'
  },
  password: {
    type: String,
    required: [true, 'you cannot login in without password'],
    minlength: 8,
    select: false, // Dont select password when send data to client .
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Confirm your password'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'confirm password should equal the password',
    },
  },
  rooms: {
    type: [String],
  },
  photo: {
    type: String,
  },
  passwordChangedAt: Date, // represent the date of changing of the password .
  passwordResetToken: String, 
  passwordResetAt: Date

});

userSchema.pre('save', async function (next) {
  // run password if the password was modified .
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined; // to dont persiste in database .
  next();
});

userSchema.methods.correctPassword = async function (
  password,
  hashpassword,
  next,
) {
  return await bcrypt.compare(password, hashpassword);
};

userSchema.methods.changedPasswordAfter = async function (JWT_TIME_CREATED) {
  // Only check if the user has changed his password if not there is no need to check .
  if (this.passwordChangedAt) {
      const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10,
    ); // transform it to int seconds
    return changedTimeStamp > JWT_TIME_CREATED; 
  }

  // False means not changed .
  return false;
};


userSchema.methods.createPasswordResetToken = function  ()  {
  
   // create our token .
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  
  this.passwordResetAt = Date.now() + 1000 * 60 * 10;

  return resetToken;
}


const User = mongoose.model('User', userSchema);

module.exports = User;
