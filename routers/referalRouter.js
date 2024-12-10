const express = require('express');
const { authenticate, authorize } = require('../middlewares/authmiddleware');
const { getReferrals, getReferralById } = require('../controllers/referalController');
 
 
const router = express.Router();

router.get('/', authenticate, authorize(['admin', 'hr']), getReferrals);
router.get('/:id', authenticate, authorize(['admin', 'hr']), getReferralById);

module.exports = router;