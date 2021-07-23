const Order = require('../models/order');
const mongoose = require('mongoose'); // Mongoose package
const Product = require('../models/product'); // Mongoose model

exports.ordersGetAll = (req, res) => {
	Order.find()
		.select('-__v')
		.populate('product')
		.exec()
		.then((orders) => {
			if (orders.length > 0) {
				res.status(200).json({
					count: orders.length,
					orders: orders.map((order) => {
						return {
							_id: order._id,
							quantity: order.quantity,
							product: order.product,
						};
					}),
				});
			} else
				res.status(404).json({
					message: 'There are no orders!',
				});
		})
		.catch((err) => {
			res.status(500).json({ error: err });
		});
};

exports.ordersPost = (req, res) => {
	Product.findById(req.body.productId)
		.select('-__v')
		.then(() => {
			const order = new Order({
				_id: mongoose.Types.ObjectId(),
				product: req.body.productId,
				quantity: req.body.quantity,
			});
			return order.save().then((order) => {
				res.status(201).json({
					message: 'Order stored',
					orderCreated: {
						_id: order._id,
						product: order.product,
						quantity: order.quantity,
					},
				});
			});
		})
		.catch((err) => {
			res.status(500).json({
				message: 'This product does not exist',
				error: err,
			});
		});
};

exports.ordersGetById = (req, res) => {
	Order.findById(req.params.id)
		.exec()
		.then((order) => {
			if (order) res.status(200).json(order);
			else res.status(404).json({ message: 'Order not found' });
		})
		.catch((err) => {
			res.status(500).json({ error: err });
		});
};

exports.ordersDelete = (req, res) => {
	Order.deleteOne({ _id: req.params.id })
		.exec()
		.then(() => {
			res.status(200).json({ message: 'Order deleted!' });
		})
		.catch((err) => {
			res.status(500).json({ error: err });
		});
};
