const express = require('express');
const app = express();
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');

const db = require('./models');
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');
const passportConfig = require('./passport');
const passport = require('passport');

dotenv.config();

db.sequelize
  .sync()
  .then(() => {
    console.log('db 연결 성공');
  })
  .catch(console.error);

//passport 설정
passportConfig();

// req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
  })
);
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(passport.initialize());
app.use(passport.session());

// Access-Control-Allow-Origin
// 다른 도메인간(프론트에서 전달된) cookie를 전달받고자 할 때 credentials: true 작성해야 한다.
// 프론트쪽에서 cookie를 전달하기 위해서는 withCredentials: true 를 설정해야 한다.
app.use(
  cors({
    origin: 'http://localhost:3060',
    credentials: true,
  })
);
// 프론트쪽 요청 확인
app.use(morgan('dev'));

app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/posts', postsRouter);

app.listen(3065, () => {
  console.log('server running...');
});
