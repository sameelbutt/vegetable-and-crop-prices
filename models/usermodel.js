const mongoose = require('mongoose');
let bcrypt=require('bcrypt')
let crypto=require('crypto')
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 3,
    select: false
  },
  confirmpassword: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function(el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!'
    }
  },
  slug: { type: String },
  PasswordChangeAt:Date,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

userSchema.pre('save',async function(next){
if(!this.isModified('password')){
  return next()
}

this.password= await bcrypt.hash(this.password,12)
this.confirmpassword = undefined;
next()
})
userSchema.pre('save',async function(next){
  if(!this.isModified('password')||this.isNew){
    return next()
  }
  this.PasswordChangeAt=Date.now()
  next()
})  
userSchema.methods.comparePassword=async function(candidatepassword,userpassword){
return await bcrypt.compare(candidatepassword,userpassword)
}
userSchema.methods.createPasswordResetToken = function() {
 
  const resetToken = crypto.randomBytes(32).toString('hex');
  

  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.resetPasswordExpires = Date.now()  + 10 * 60 * 1000;

  return resetToken;
};
module.exports = mongoose.model('User', userSchema);
