const catchAsync = require('../errorHandling/catchAsync');
const Store = require('./../models/storeModel');

exports.getStores = catchAsync(async (req, res, next)=>{

    const stores = await Store.find();

    return res.status(200).json({
        status: 'success',
        count: stores.length,
        data: stores
    });

});

exports.addStore = catchAsync(async (req, res, next)=>{

    
    const addedStore = await Store.create(req.body);

    res.status(200).json({
        status: 'success',
        data: addedStore
    });
    
});


