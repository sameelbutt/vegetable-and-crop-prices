const vegmodel = require('../models/vegmodel');
const catchasync = require('../utils/catchasync');


exports.getallveg = catchasync(async (req, res) => {
    const { city } = req.query;
    let query = {};

    if (city) {
        query.city = city;
    }

    const vegetables = await vegmodel.find(query);
    res.status(200).json({
        status: 'success',
        data: vegetables
    });
});


exports.createveg = catchasync(async (req, res) => {
    const vegetable = await vegmodel.create(req.body);
    res.status(201).json({
        status: 'success',
        data: vegetable
    });
});


exports.getveg = catchasync(async (req, res) => {
    const vegetable = await vegmodel.findById(req.params.id);
    if (!vegetable) {
        return res.status(404).json({
            status: 'fail',
            message: 'Vegetable not found'
        });
    }
    res.status(200).json({
        status: 'success',
        data: vegetable
    });
});


exports.updateveg = catchasync(async (req, res) => {
    const vegetable = await vegmodel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true 
    });

    if (!vegetable) {
        return res.status(404).json({
            status: 'fail',
            message: 'Vegetable not found'
        });
    }

    res.status(200).json({
        status: 'success',
        data: vegetable
    });
});


exports.dltveg = catchasync(async (req, res) => {
    const vegetable = await vegmodel.findByIdAndDelete(req.params.id);

    if (!vegetable) {
        return res.status(404).json({
            status: 'fail',
            message: 'Vegetable not found'
        });
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
});


exports.alldeletedata = catchasync(async (req, res) => {
    await vegmodel.deleteMany({});
    res.status(204).json({
        status: 'success',
        data: null
    });
});
