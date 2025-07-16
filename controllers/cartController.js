const Cart = require('../models/Cart');

exports.getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
  res.json(cart);
};

exports.addToCart = async (req, res) => {
  const { product, quantity } = req.body;
  let cart = await Cart.findOne({ user: req.user.id });

  if (!cart) {
    cart = await Cart.create({ user: req.user.id, items: [{ product, quantity }] });
  } else {
    const itemIndex = cart.items.findIndex(item => item.product.toString() === product);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product, quantity });
    }
    await cart.save();
  }
  res.json(cart);
};

exports.removeFromCart = async (req, res) => {
  const { product } = req.body;
  const cart = await Cart.findOne({ user: req.user.id });
  cart.items = cart.items.filter(item => item.product.toString() !== product);
  await cart.save();
  res.json(cart);
};