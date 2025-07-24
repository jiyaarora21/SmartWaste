const express = require('express');
const router = express.Router();
const wasteController = require('../controllers/wasteController');

// Route to submit a request
router.post('/', wasteController.createWasteRequest);

// Route to get all requests
router.get('/', wasteController.getAllWasteRequests);
// Route to get a single request by ID
router.get('/:id', wasteController.getWasteRequestById);

router.patch('/:id', wasteController.updateWasteStatus);
router.delete('/:id', wasteController.deleteWasteRequest);


module.exports = router;
