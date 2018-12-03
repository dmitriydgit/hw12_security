const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({

	username: {
		type: 'String',
		unique: true,
		required: true
	},
	email: String,
	password: {
		type: String,
		required: true
	},
	fullName: String,
	avatar: String
});

UserSchema.pre('save', function (next) {
	var user = this;
	if (this.isModified('password') || this.isNew) {
		bcrypt.genSalt(10, function (err, salt) {
			if (err) {
				return next(err)
			}
			bcrypt.hash(user.password, salt, null, function (err, hash) {
				if (err) {
					return next(err)
				}
				user.password = hash;
				next();
			})
		})
	} else {
		next();
	}
});

UserSchema.methods.comparePassword = function (password, cb) {
	bcrypt.compare(password, this.password, function (err, isMatch) {
		if (err) {
			return cb(err);
		}
		cb(null, isMatch);
	})
}

const UserModel = mongoose.model(`User`, UserSchema);

module.exports = UserModel;

/*
"username": "Dave",
    "fullName": "Dave Gamache",
    "password": "12345",
    "email": "ddd@gmail.com",
    "avatarUrl": "/assets/img/avatar-dhg.png"
*/


