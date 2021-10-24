const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Item = require('./models/items');
const uri =
	'mongodb+srv://joao_otavio:' +
	process.env.MONGO_PW +
	'@items.gpdzl.mongodb.net/' +
	process.env.MONGO_DB +
	'?retryWrites=true&w=majority';

mongoose
	.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(app.listen(3000));

var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads');
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '-' + Date.now());
	},
});

var upload = multer({ storage: storage });

app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(morgan('dev'));
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

app.get('/', (req, res) => {
	res.redirect('./items');
});

app.get('/add-item', (req, res) => {
	res.render('add-item');
});

app.post('/create-item', upload.single('image'), (req, res) => {
	const item = Item({
		name: req.body.name,
		price: req.body.price,
		img: {
			data: fs.readFileSync(
				path.join(__dirname + '/uploads/' + req.file.filename),
				'base64'
			),
			contentType: 'image/png',
		},
	});

	item.save()
		.then(() => {
			res.redirect('/items');
		})
		.catch((err) => {
			res.status(500).json({ error: err });
		});
});

app.get('/items', (req, res) => {
	Item.find()
		.then((item) => {
			res.render('index', { items: item });
		})
		.catch((err) => {
			res.status(500).json({ error: err });
		});
});

app.get('/items/:id', (req, res) => {
	Item.findById(req.params.id)
		.then((item) => {
			res.render('details', { item: item });
		})
		.catch((err) => {
			res.status(500).json({ error: err });
		});
});

app.post('/uploadFile', (req, res) => {
	console.log(req.params);
});

app.delete('/items/delete/:id', (req, res) => {
	Item.findByIdAndDelete(req.params.id)
		.then((item) => {
			res.status(200).json({ message: `Item deleted: ${item}` });
		})
		.catch((err) => {
			res.status(500).json({ error: err });
		});
});

app.put('/items/:id/update', (req, res) => {
	if (req.body) {
		Item.findByIdAndUpdate({ _id: req.params.id }, req.body, {
			useFindAndModify: true,
		})
			.then((item) => {
				res.status(200).json({ message: `Item updated: ${item}` });
			})
			.catch((err) => {
				res.status(500).json({ error: err });
			});
	}
});

app.use((req, res) => {
	res.render('404');
});
