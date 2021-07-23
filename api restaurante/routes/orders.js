const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const OrdersController = require('../controllers/orders');
// Handle incoming GET requests to /orders
router.get('/', checkAuth, OrdersController.ordersGetAll);

router.post('/', checkAuth, OrdersController.ordersPost);

router.get('/:id', checkAuth, OrdersController.ordersGetById);

router.delete('/:id', checkAuth, OrdersController.ordersDelete);

module.exports = router;
