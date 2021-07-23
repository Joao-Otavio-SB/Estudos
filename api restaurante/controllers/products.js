const product = require('../models/product');
const Product = require('../models/product');
const mongoose = require('mongoose');

exports.productsGetAll = (req, res) => {
	product
		.find()
		.select('-__v')
		.exec()
		.then((product) => {
			if (product.length > 0)
				res.status(200).json({
					count: product.length,
					products: product.map((product) => {
						return {
							name: product.name,
							price: product.price,
							id: product._id,
							productImage: product.productImage,
							request: {
								type: 'GET',
								URL: 'localhost:3000/products/' + product._id,
							},
						};
					}),
				});
			else
				res.status(404).json({
					error: 'there is no products registered in data base',
				});
		})
		.catch((err) => {
			res.status(500).json({ error: err });
		});
};

exports.productsPost = (req, res) => {
	const product = new Product({
		// Criando objeto por meio do Schema do mongoose
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		price: req.body.price,
		productImage: req.file.path,
	});

	product
		.save()
		.then((result) => {
			res.status(201).json({
				message: 'Product created!',
				productCreated: result, // OBS: result é a mesma coisa que o próprio product
			});
		})
		.catch((err) => {
			res.status(500).json({
				error: err,
			});
		});
};

exports.productsGetById = (req, res) => {
	const id = req.params.id;
	product
		.findById(id)
		.exec()
		.then((doc) => {
			if (doc) res.status(200).json(doc);
			else res.status(404).json({ error: 'Product not found' });
		})
		.catch((err) => {
			res.status(500).json({
				error: err,
			});
		});
};

exports.productsPatch = (req, res) => {
	const id = req.params.id;
	const options = {};

	for (const ops of req.body) {
		options[ops.variable] = ops.newValue;
	}

	product
		.updateOne({ _id: id }, { $set: options })
		.exec()
		.then((doc) => {
			res.status(200).json(doc);
		})
		.catch((err) => res.status(500).json({ error: err }));
};

exports.productsDelete = (req, res) => {
	const id = req.params.id;
	product
		.remove({ _id: id })
		.exec()
		.then((doc) => {
			res.status(200).json(doc);
		})
		.catch((err) => res.status(500).json({ error: err }));
};

exports.productsDeleteAll = (req, res) => {
	product
		.remove()
		.exec()
		.then(() => {
			res.status(200).json({ message: 'All orders deleted!' });
		});
};
