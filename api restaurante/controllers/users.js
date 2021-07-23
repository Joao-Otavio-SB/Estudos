const mongoose = require('mongoose');
const crypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.userSignUp = (req, res) => {
	User.find({ email: req.body.userEmail }) // Checks if there is alerady a email registered in the database
		.exec()
		.then((user) => {
			if (user.length >= 1)
				return res
					.status(409)
					.json({ message: 'This user email is already registered' });
		})
		.catch((err) => res.status(500).json({ error: err }));

	crypt.hash(req.body.userPassword, 10, (err, hash) => {
		// If not, hashes the password and save the user in database
		if (err) return res.status(500).json({ error: err });
		else {
			const user = new User({
				_id: new mongoose.Types.ObjectId(),
				email: req.body.userEmail,
				password: hash,
			});
			user.save()
				.then((user) => {
					res.status(200).json({
						message: 'User created!',
						userData: user,
					});
				})
				.catch((err) => {
					res.status(500).json({ error: err });
				});
		}
	});
};

exports.userLogin = (req, res) => {
	User.find({ email: req.body.userEmail })
		.exec()
		.then((user) => {
			if (user.length < 1)
				return res.status(401).json({
					message: 'Auth failed!',
				});
			crypt.compare(
				req.body.userPassword,
				user[0].password,
				(err, result) => {
					if (err)
						return res.status(401).json({
							message: 'Auth failed!',
						});
					if (result) {
						token = jwt.sign(
							{
								email: user[0].email,
								userId: user[0]._id,
							},
							process.env.JWT_KEY,
							{
								expiresIn: '1h',
							}
						);
						return res.status(200).json({
							Message: 'Auth successful!',
							Token: token,
						});
					}
					res.status(401).json({ message: 'Auth failed!' });
				}
			);
		})
		.catch((err) => {
			res.status(500).json({ error: err });
		});
};

exports.userDelete = (req, res) => {
	User.findById(req.params.id)
		.exec()
		.then((user) => {
			if (!user)
				return res
					.status(404)
					.json({ message: 'This user does not exist' });
		})
		.catch((err) => {
			res.status(500).json({ error: err });
		});
	User.deleteOne({ _id: req.params.id })
		.exec()
		.then(() => {
			res.status(200).json({ message: 'User deleted!' });
		})
		.catch((err) => {
			res.status(404).json({ error: err });
		});
};
