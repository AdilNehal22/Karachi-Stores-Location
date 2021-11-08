const mongoose = require('mongoose');
const geocoder = require('./../utils/geocoder');

const storeSchema = new mongoose.Schema({

    storeId: {
        type: String,
        required: [true, 'Please add a store ID'],
        unique: true,
        trim: true,
        maxlength: [10, 'store ID must be equal to 10 characters']
    },

    address: {
        type: String,
        required: [true, 'please add an address']
    },

    location: {

        type: {
          type: String,    // Don't do `{ location: { type: String } }`
          enum: ['Point'],   // 'location.type' must be 'Point'
        },

        coordinates: {
          type: [Number],
          index: '2dsphere' //2d sphere support queries that calculate geometries on an earth like sphere.
        },

        formattedAddress: String,

        createdAt: {
            type: Date,
            default: Date.now()
        }

    }

});

//geocoder and create location

storeSchema.pre('save', async function(next){
    const geoCodedLocation = await geocoder.geocode(this.address);
    this.location = {
        type: 'Point',
        coordinates: [geoCodedLocation[0].longitude, geoCodedLocation[0].latitude],
        formattedAddress: geoCodedLocation[0].formattedAddress
    };
    //donot save address
    this.address = undefined;

    next();
});

module.exports = mongoose.model('Store', storeSchema);