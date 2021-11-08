const express = require('express');
const stores = require('./../controller/stores');


const router = express.Router();

router.route('/').get(stores.getStores).post(stores.addStore);

module.exports = router;