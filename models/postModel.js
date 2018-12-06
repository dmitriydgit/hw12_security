const mongoose = require('mongoose');

var PostSchema = mongoose.Schema({
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: `User`
	},
	publicationDate: {
		type: Date,
	},
	text: {
		type: String,
		required: true
	},
	picture: String,
	editable: {
		type: Boolean
	}
});

PostSchema.statics.findSortedDsc = function (cb) {
	this.find({})
		.populate("author")
		.sort({ publicationDate: -1 })
		.lean()
		.exec(cb)
};

// PostSchema.statics.addEditable = function (posts, userId) {
// 	return posts.map(post => {
// 		post.editable = post.author._id.equals(userId);
// 		return post;
// 	});
// };

PostSchema.pre("save", function (next) {
	this.publicationDate = Date.now();
	next();
});

PostSchema.post("save", function (err, post, next) { //ошибки, доп валидация и тд
	if (err.name !== "MongoError" && error.code !== 11000) {
		return next(error);
	}
	var path = 'duplicate key';
	var validationError = new mongoose.Error.validationError();
	validationError.errors[path] = validationError.errors[path] || {};
	validationError.errors[path].message = '{0} is expected to be unique.'.replace('{0}', path);
	validationError.errors[path].reason = err.message;
	validationError.errors[path].name = err.name;
	next(validationError);
})


// PostSchema.post('find', function (err, comments, UserId, next) {
// 	if (err) {
// 		console.log(err);
// 	}
// 	next();
// 	return comments.map(comment => {
// 		comment.editable = comment.author._id.equals(UserId);
// 		return comment;
// 	});
// });

const Post = mongoose.model(`Post`, PostSchema);

module.exports = Post;

