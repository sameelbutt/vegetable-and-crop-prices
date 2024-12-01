// controllers/viewController.js

const VegetablePrice = require('../models/vegmodel');
let catchasync=require('./../utils/catchasync')
const crops = require('../models/cropmodel');

exports.getVegetablePricesPage = async (req, res) => {
  try {
    // Fetch unique cities from the database
    const cities = await VegetablePrice.distinct('city');
    res.render('vegtemplate', { cities });
  } catch (error) {
    console.error('Error rendering vegetable prices page:', error);
    res.status(500).send('An error occurred while loading the page');
  }
};

exports.getcropprice = async (req, res) => {
  try {
    // Fetch unique cities from the database
    const cities = await crops.distinct('city');
    res.render('crop', { cities });
  } catch (error) {
    console.error('Error rendering vegetable prices page:', error);
    res.status(500).send('An error occurred while loading the page');
  }
};
exports.signups=catchasync (async (req, res) => {

res.render('register')

})
exports.login=catchasync (async (req, res) => {

  res.render('signin')
  forgetpassword
  })
  exports.forget=catchasync (async (req, res) => {

    res.render('forgetpassword')
    
    })

    exports.reset=catchasync (async (req, res) => {

      res.render('resetpassword')
    
      })

      exports.index=catchasync (async (req, res) => {

        res.render('index')
      
        })