const NodeGeocoder = require('node-geocoder');

const options = {

  provider: 'mapquest',
  httpAdapter: 'https',
  apiKey: '38LEnjOVIH0sm5sNr7vY44mAxIGSjbvJ', 
  formatter: null 

};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;

