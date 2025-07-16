const express = require('express');
const router = express.Router();
const {
  getCart,
  addToCart,
  removeFromCart
} = require('../controllers/cartController');
const { protect, authorize } = require('../middlewares/authMiddleware');

// Customer-only cart routes
router.get('/', protect, authorize('customer'), getCart);
router.post('/add', protect, authorize('customer'), addToCart);
router.post('/remove', protect, authorize('customer'), removeFromCart);

module.exports = router;
