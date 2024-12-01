let express= require('express')
let router=express.Router()
let vegcontroll=require('./../controllers/cropcontroller')
router.route('/').get(vegcontroll.getallcrop).post(vegcontroll.createcrop).put(vegcontroll.alldeletecrop)
router.route('/:id').get(vegcontroll.getcrop).patch(vegcontroll.updatecrop).delete(vegcontroll.dltcrop)



module.exports = router;