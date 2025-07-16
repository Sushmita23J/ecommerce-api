const express = require('express');
const router = express.Router();
const {
  placeOrder,
  getMyOrders
} = require('../controllers/orderController');
const { protect, authorize } = require('../middlewares/authMiddleware');

router.post('/', protect, authorize('customer'), placeOrder);
router.get('/', protect, authorize('customer'), getMyOrders);

module.exports = router;
