const express = require('express');
const app = express();
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

const db = require('./models');
const userRouter = require('./routes/user');
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
app.use(
  cors({
    origin: '*',
    credentials: false,
  })
);

app.use('/user', userRouter);

app.listen(3065, () => {
  console.log('server running...');
});
