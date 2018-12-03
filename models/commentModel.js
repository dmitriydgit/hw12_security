const mongoose = require('mongoose');

var CommentSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: `User`
	},
	post_id: mongoose.Schema.Types.ObjectId,
	publicationDate: {
		type: Date,
	},
	text: {
		type: String,
		required: true
	},
	editable: {
		type: Boolean
	}
});

CommentSchema.statics.findCommentAndPopulateUser = function (postId, cb) {
	this.find({ "post_id": postId })
		.populate(`user`)
		.sort({ publicationDate: -1 })
		.exec(cb);
}


const Comments = mongoose.model(`Comment`, CommentSchema);

module.exports = Comments;

