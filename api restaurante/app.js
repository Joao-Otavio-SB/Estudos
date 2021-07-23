const express = require('express');
const app = express();

const products = require('./routes/products');
const orders = require('./routes/orders');
const users = require('./routes/users');

const morgan = require('morgan');
const mongoose = require('mongoose');

mongoose.connect(
	'mongodb+srv://joaoOtavio:' +
		process.env.MONGO_ATLAS_PW +
		'@node-learning.q56vq.mongodb.net/' +
		process.env.MONGO_ATLAS_DB +
		'?retryWrites=true&w=majority',
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
);

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);

	if (req.method === 'OPTIONS') {
		res.header(
			'Access-Control-Allow-Methods',
			'PUT, POST, PATCH, DELETE, GET'
		);
		return res.status(200).json({});
	}
	next();
});

// Routes wich should handle requests
app.use('/products', products);
app.use('/orders', orders);
app.use('/users', users);

app.use((req, res, next) => {
	const err = new Error('Not found');
	err.status = 404;
	next(err);
});

app.use((err, req, res, next) => {
	res.status(err.status || 500);
	res.json({
		error: {
			message: err.message,
		},
	});
});

module.exports = app;
