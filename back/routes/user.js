const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const { User, Post } = require('../models');
const db = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

// GET /user
router.get('/', async (req, res, next) => {
  try {
    // 사용자가 로그인 되어있는 경우
    if (req.user) {
      const fullUserWithoutPassoword = await User.findOne({
        where: { id: req.user.id },
        attributes: {
          //passoword를 제외한 모든 column 가져오기
          exclude: ['password'],
        },
        include: [
          {
            model: Post,
            attributes: ['id'], // attributes 사용해서 필요한 데이터만 전송
          },
          {
            model: User,
            as: 'Followings',
            attributes: ['id'],
          },
          {
            model: User,
            as: 'Followers',
            attributes: ['id'],
          },
        ],
      });
      res.status(200).json(fullUserWithoutPassoword);
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// signin 로그인
router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    //서버 에러
    if (err) {
      console.error(err);
      // error 처리 미들웨어는 따로 작성하지 않아도 기본적으로 내장되어있다.
      return next(err);
    }
    //client 에러
    if (info) {
      return res.status(401).send(info.reason);
    }
    //로그인 성공
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      const fullUserWithoutPassoword = await User.findOne({
        where: { id: user.id },
        attributes: {
          //passoword를 제외한 모든 column 가져오기
          exclude: ['password'],
        },
        include: [
          {
            model: Post,
            attributes: ['id'],
          },
          {
            model: User,
            as: 'Followings',
            attributes: ['id'],
          },
          {
            model: User,
            as: 'Followers',
            attributes: ['id'],
          },
        ],
      });
      //cookie와 사용자 정보를 보낸다.
      return res.status(200).json(fullUserWithoutPassoword);
    });
  })(req, res, next);
});

// signup 회원가입
router.post('/', isNotLoggedIn, async (req, res, next) => {
  try {
    // 중복 email 체크
    const existedUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    // 중복 nickname 체크
    const existedNickname = await User.findOne({
      where: {
        nickname: req.body.nickname,
      },
    });

    if (existedUser) {
      return res.status(403).send('이미 사용중인 아이디 입니다.');
    }
    if (existedNickname) {
      return res.status(403).send('이미 사용중인 닉네임 입니다.');
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });
    res.status(201).json({ signUpSuccess: true });
  } catch (error) {
    console.log(error);
    next(error); // status 500 서버측 에러
  }
});

router.post('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('ok');
});

router.patch('/nickname', isLoggedIn, async (req, res, next) => {
  try {
    await User.update(
      {
        nickname: req.body.nickname,
      },
      {
        where: { id: req.user.id },
      }
    );
    res.status(200).json({ nickname: req.body.nickname });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
