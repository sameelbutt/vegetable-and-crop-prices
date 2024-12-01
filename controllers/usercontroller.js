const catchasync = require("../utils/catchasync");
let User = require('./../models/usermodel');
exports.getalluser=catchasync(async(req,res)=>{

    let user=await User.find()
res.json({
    status:'pass',
    user
})

})