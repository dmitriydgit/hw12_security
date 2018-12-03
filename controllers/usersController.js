const UserModel = require('../models/userModel');

const jwt = require('jsonwebtoken');
const User = require('../models/userModel')

function signup(req, res) {
	if (!req.body.username || !req.body.password) {
		res.json({ success: false, message: 'Please pass username and password' });
	} else {
		var newUser = new User(req.body);
		newUser.save(function (err) {
			if (err) {
				return res.json({ success: true, msg: 'Username already esist' });
			}
			res.json({ success: true, msg: 'New user created' });
		});
	};
};

function signin(req, res) {
	//console.log(req.body.username)
	User.findOne({ username: req.body.username }, function (err, user) {
		if (err) {
			throw (err);
		}
		if (!user) {
			return res.status(401).send({ success: false, msg: 'Autentification failed. User not found' });
		}
		user.comparePassword(req.body.password, function (err, isMatch) {
			//console.log(req.body.password)
			// if (err) {
			// 	console.log(err)
			// }
			if (isMatch && !err) {
				var token = jwt.sign(user.toObject(), 'secret-word', { expiresIn: '1d' });
				return res.status(200).json({ success: true, token: 'JWT ' + token })
			}
			res.status(401).send({ success: false, msg: 'Autentification failed. Wrong password' });
		});
	});
};


module.exports = {
	signin,
	signup
};
