const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fileUpload = require('express-fileupload');
const passport = require('passport');
require('./configs/pasport.config')(passport);// обязательно для аутентификации
const PostsService = require('./services/postsService');
const UserModel = require('./models/userModel');

const indexRouter = require('./routes/index');
const profileRouter = require('./routes/profile');
const notificationsRouter = require('./routes/notifications');
const loginRouter = require('./routes/login');
const apiRouter = require('./routes/api');
const usersRouter = require('./routes/users');
const signupRouter = require('./routes/signup');
const mongoose = require('./models/mongo');


const app = express();

app.use(passport.initialize());

app.set(path.join(__dirname, 'views'));
app.set("view engine", "hbs");
app.use(fileUpload());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', loginRouter);//+
app.use('/logout', loginRouter);
app.use('/signup', signupRouter);
app.use('/profile', profileRouter);
app.use('/notifications', notificationsRouter);
app.use('/docs', loginRouter);
app.use('/api', apiRouter);
app.use('/login-api', usersRouter);

app.use(fileUpload());

module.exports = app;
