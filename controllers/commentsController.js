const CommentModel = require('../models/commentModel');


function getCommentsByPostID(req, res) {
	var postId = req.params.postId;
	var userId = req.user._id;
	CommentModel.findCommentAndPopulateUser(postId, function (err, comments) {
		if (err) {
			console.log(err);
			res.status(500).json({ success: false, message: 'err.massage' });
		}
		res.status(302).json(addEditable(comments, userId));
	})
};

function createComment(req, res) {
	console.log(req.user)
	var userId = req.user._id;
	var commentText = req.body.text;
	var postId = req.body.postId;
	saveComment(commentText, postId, userId);
	res.status(201).json({ success: true, message: "created" });
};

function saveComment(commentText, postId, userId) {
	var newComment = {
		user: userId,
		post_id: postId,
		publicationDate: Date.now(),
		text: commentText
	};
	CommentModel.create(newComment, function (err, comment) {
		if (err) {
			console.log(err);
		}
		console.log('Comment saved to DB', comment)
	});
}

function getCommentByID(req, res) {
	var commentId = req.params.commentId;
	CommentModel.findById(commentId, function (err, comment) {
		if (err) {
			console.log(err);
			res.status(500).json({ success: false, message: 'err.massage' });
		};
		res.json(comment);
	});
};

function editComment(req, res) {
	var commentId = req.body._id;
	var commentText = req.body.text;
	updateComment(commentId, commentText);
	res.status(201).json({ success: true, message: 'updated' });
};

function updateComment(commentId, commentText) {
	CommentModel.findById(commentId, function (err, foundComment) { // чекнул есть ли коммент в базе
		if (err) {
			console.log(err);
		}

		if (foundComment) {
			foundComment.text = commentText;
			foundComment.save(function (err) {
				if (err) {
					console.log(err);
				}
				console.log('Comment saved to DB')
			})

		}
	});
}

function deleteComment(req, res) {
	var commentId = req.params.commentId;
	console.log(commentId)
	deleteCommentById(commentId);
	res.status(204).json({ success: true, message: 'deleted' });
}

function deleteCommentById(commentId) {
	CommentModel.findByIdAndRemove(commentId, function (err, comment) {
		if (err) {
			console.log(err);
		}
		console.log("Comment deleted");
	})
}


module.exports = {
	getCommentsByPostID,
	getCommentByID,
	createComment,
	editComment,
	deleteComment
};


function addEditable(comments, userId) {

	return comments.map(comment => {
		//console.log(userId, comment.user._id)
		comment.editable = comment.user._id.equals(userId);
		//console.log(comment.editable)
		return comment;
	});
};