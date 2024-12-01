let User = require('./../models/usermodel');
let catchAsync = require('./../utils/catchasync');
let jwt = require('jsonwebtoken');
const { promisify } = require('util');
let crypto=require('crypto')
let sendEmail=require('./../utils/email')
exports.signup = catchAsync(async (req, res) => {
    let user = await User.create({
     
        email: req.body.email,
        password: req.body.password,
        confirmpassword:req.body.confirmpassword,
        role:req.body.role
    })

    let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })

    res.status(201).json({
        status: 'success',
        token: token
    })
})

exports.login = catchAsync(async (req, res) => {
   let { email, password } = req.body;
   let user = await User.findOne({ email: email }).select('+password');
  
   if(!user||!(await user.comparePassword(password,user.password))){
    return res.status(401).json({
        status: 'fail',
   })

   }
   let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
})
    res.status(201).json({
        status: 'success',
        token: token,
        user
    })
})
exports.protect = catchAsync(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } 

    if (!token) {
        return res.status(401).json({
            status: 'fail',
            message: 'Unauthorized, no token provided'
        });
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

 

    const currentUser = await User.findById(decoded.id);
    
   

    if (!currentUser) {
        return res.status(401).json({
            status: 'fail',
            message: 'The user belonging to this token no longer exists.'
        });
    }

    req.user = currentUser;
    next();
});

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                status: 'fail',
                message: 'Unauthorized, user not found'
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                status: 'fail',
                message: 'Forbidden, you do not have the required role'
            });
        }

        next();
    };
};

exports.forgotPassword = catchAsync(async (req, res) => {
    const { email } = req.body;
  
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'No user found with that email address.'
      });
    }
  
    
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });
  
   
    const resetURL = `http://127.0.0.1:3000/reset-password?token=${encodeURIComponent(resetToken)}`;
    const message = `Forgot your password? Submit a PATCH request with your new password to: ${resetURL}.\nIf you didn't forget your password, please ignore this email.`;
  
    try {
      
      await sendEmail({
        email: user.email,
        subject: 'Your password reset token (valid for 10 minutes)',
        message
      });
  
      res.status(200).json({
        status: 'success',
        message: 'Token sent to email!'
      });
    } catch (err) {
     
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save({ validateBeforeSave: false });
  
      console.error(err);
      res.status(500).json({
        status: 'error',
        message: 'There was an error sending the email. Try again later.',
        error: err.message
      });
    }
  });

exports.resetPassword=catchAsync(async(req,res)=>{

    let hashedtoken=crypto.createHash('sha256').update(req.params.token).digest('hex');
    let user=await User.findOne({resetPasswordToken:hashedtoken,resetPasswordExpires:{$gt:Date.now()}})
    if(!user) return res.status(400).json({status:'fail',message:'Invalid'})
        user.password = req.body.password;
    user.confirmpassword = req.body.confirmpassword; 
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
user.save()
let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
})
res.status(200).json({status:'success',token,message:'Password updated successfully'})

})
exports.updatePassword=catchAsync(async(req,res)=>{

let user=await User.findById(req.user.id).select('+password')
if(!(user.comparePassword(req.body.CurrentPassword,user.password))){
    return res.status(400).json({status:'fail',message:'No User'})

}
user.password=req.body.password
user.confirmpassword=req.body.confirmpassword
await user.save()

let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
})
    res.status(201).json({
        status: 'success',
        token: token,
        user
    })




})