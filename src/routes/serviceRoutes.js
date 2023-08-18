// src/routes/serviceRoutes.js

const express = require('express');
const serviceController = require('../controllers/serviceController');

const router = express.Router();

router.get('/:code', serviceController.getServiceStatus);
router.post('/', serviceController.createService);
router.put('/:code', serviceController.updateService);

module.exports = router;