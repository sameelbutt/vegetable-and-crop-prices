let express = require('express');
let authController = require('./../controllers/auth');

let usercontroller = require('./../controllers/usercontroller');
let router = express.Router();


router.get('/', usercontroller.getalluser);

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forget', authController.forgotPassword);
router.patch('/resetPassword/:token',authController.resetPassword)
router.patch('/updatePassword',authController.protect,authController.updatePassword)

module.exports = router;
