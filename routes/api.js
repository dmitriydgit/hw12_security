const passport = require('passport');
const express = require('express');
const router = express.Router();

router.use(passport.authenticate('jwt', { session: false }));

const postController = require('../controllers/postController');
const commentsController = require('../controllers/commentsController');

router.get('/posts', postController.getPostList);

router.get('/posts/:postId', postController.getPostByID);

router.post('/posts', postController.createPost);

router.patch('/posts/:postId', postController.editPost);

router.delete('/posts/:postId', postController.deletePost);

//comments

router.get('/posts/:postId/comments', commentsController.getCommentsByPostID);

router.get('/posts/:postId/comments/:commentId', commentsController.getCommentByID);

router.post('/posts/:postId/comments', commentsController.createComment);

router.patch('/posts/:postId/comments/:commentId', commentsController.editComment);

router.delete('/posts/:postId/comments/:commentId', commentsController.deleteComment);


module.exports = router;


/*
router.get('/posts', postController.getPostList);

router.get('/posts/:postId', postController.getPostByID);

router.post('/posts', postController.createPost);

router.patch('/posts/:postId', postController.editPost);

router.delete('/posts/:postId', postController.deletePost);

//comments

router.get('/comments/:postId', commentsController.getCommentsByPostID);

router.get('/comment/:commentId', commentsController.getCommentByID);

router.post('/comments', commentsController.createComment);

router.patch('/comments', commentsController.editComment);

router.delete('/comment/:commentId', commentsController.deleteComment);


*/


//    mongoose.disconnect(); после save зачем??
// когда редактируем в консоли (node:5431) DeprecationWarning: collection.findAndModify is deprecated. Use findOneAndUpdate, findOneAndReplace or findOneAndDelete instead.
// нужен пример работы с мидлвэйр (когда сохраняем пост)
//картинка сохраняется в jpg/ как вытащить формат картинки?
//mongoose.set('useFindAndModify', false);
//юзать lean вместо exec
/*
PostModel.find()
.sort({ _id: -1 })
.populate('author')
.lean();


//lean() зачем?
*/
// indexes
//foreign key + primary key
/*
— промежуточное ПО уровня модели
— промежуточное ПО для агрегатов
— промежуточное ПО для запросов
*/
