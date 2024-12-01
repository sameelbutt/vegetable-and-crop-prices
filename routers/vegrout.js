let express= require('express')
let router=express.Router()
let vegcontroll=require('./../controllers/vegcontroller')
router.route('/').get(vegcontroll.getallveg).post(vegcontroll.createveg).put(vegcontroll.alldeletedata)
router.route('/:id').get(vegcontroll.getveg).patch(vegcontroll.updateveg).delete(vegcontroll.dltveg)



module.exports = router;