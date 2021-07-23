const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const ProductsController = require('../controllers/products');

const multer = require('multer');
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './uploads/');
	},
	filename: (req, file, cb) => {
		cb(null, new Date().toDateString() + file.originalname);
	},
});

const fileFilter = (req, file, cb) => {
	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
		cb(null, true);
	else cb(null, false);
};

const upload = multer({
	storage: storage,
	limits: {
		fileSize: 1024 * 1024 * 5,
	},
	fileFilter: fileFilter,
});

router.get('/', ProductsController.productsGetAll);

router.post(
	'/',
	checkAuth,
	upload.single('productImage'),
	ProductsController.productsPost
);

router.get('/:id', ProductsController.productsGetById);

router.patch('/:id', checkAuth, ProductsController.productsPatch);

router.delete('/:id', checkAuth, ProductsController.productsDelete);

router.delete('/', checkAuth, ProductsController.productsDeleteAll);

module.exports = router;
