function addEditable(comments, userId) {

	return comments.map(comment => {
		comment.editable = comment.user._id.equals(userId);
		return comment;
	});
};

module.exports = {
	addEditable
};