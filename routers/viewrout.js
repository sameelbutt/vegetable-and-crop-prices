// routes/viewRoutes.js

const express = require('express');
const router = express.Router();
const viewController = require('./../controllers/viewcontroller');

router.get('/vegetable-prices', viewController.getVegetablePricesPage);

router.get('/crop-prices', viewController.getcropprice);
router.get('/',viewController.signups)
router.get('/login',viewController.login)
router.get('/forget-password',viewController.forget)
router.get('/reset-password',viewController.reset)
router.get('/view-cart',viewController.index)

// router.get('/admin', viewController.adminpanel);

module.exports = router;