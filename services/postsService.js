var addEditable = function (posts, userId) {
	return posts.map(post => {
		post.editable = post.author._id.equals(userId);
		return post;
	});
};

module.exports = {
	addEditable
};