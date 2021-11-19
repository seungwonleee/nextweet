const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const { User, Post, Comment, Image } = require('../models');
const { Op } = require('sequelize');
const db = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

// GET /user 내 정보 가져오기
router.get('/', async (req, res, next) => {
  console.log(req.headers);
  try {
    // 사용자가 로그인 되어있는 경우 사용자 정보 DB에서 검색
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
      // 사용자가 로그인 되어있지 않은 경우 null 응답
      res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// POST /user/login 로그인 (passport local 로그인)
router.post('/login', isNotLoggedIn, (req, res, next) => {
  //passport에서 done하면 콜백함수 실행
  passport.authenticate('local', (err, user, info) => {
    // 서버 에러
    if (err) {
      console.error(err);
      // error 처리 미들웨어로 이동
      return next(err);
    }

    //client 에러
    if (info) {
      return res.status(401).send(info.reason);
    }

    //로그인
    return req.login(user, async (loginErr) => {
      // passport 자체 로그인 에러 처리
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
      //cookie와 사용자 정보 응답
      return res.status(200).json(fullUserWithoutPassoword);
    });
  })(req, res, next);
});

// GET /user/auth/google (passport google 로그인)
router.get('/auth/google', (req, res, next) => {
  passport.authenticate('google', {
    // 권한 범위
    scope: ['https://www.googleapis.com/auth/plus.login', 'email'],
  })(req, res, next);
});

// GET /user/auth/google/callback (google 로그인 redirect url)
const googleRedirectUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.PROD_GOOGLE_REDIRECT_URL
    : process.env.DEV_GOOGLE_REDIRECT_URL;

router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: googleRedirectUrl }),
  // 성공시 redirect
  function (req, res) {
    res.redirect(googleRedirectUrl);
  }
);

// POST /user 회원가입
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

    // 비밀번호 암호화해서 저장
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

// POST /user/logout 로그아웃
router.post('/logout', isLoggedIn, (req, res) => {
  // 세션에 저장된 cookie와 id 삭제
  req.session.destroy();
  req.logout();
  res.send('logout success');
});

// PATCH /user/nickname 닉네임 수정
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

// PATCH /user/:userId/follow 팔로우 하기
router.patch('/:userId/follow', isLoggedIn, async (req, res, next) => {
  // PATCH /user/1/follow
  try {
    const user = await User.findOne({ where: { id: req.params.userId } });
    if (!user) {
      res.status(403).send('존재하지 않는 사용자를 팔로우할 수 없습니다.');
    }
    await user.addFollowers(req.user.id);
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// DELETE /user/userId/follow 팔로우 취소하기
router.delete('/:userId/follow', isLoggedIn, async (req, res, next) => {
  // DELETE /user/1/follow
  try {
    const user = await User.findOne({ where: { id: req.params.userId } });
    if (!user) {
      res.status(403).send('존재하지 않는 사용자를 언팔로우할 수 없습니다.');
    }
    await user.removeFollowers(req.user.id);
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// DELETE /user/follower/:userId 팔로워 삭제하기
router.delete('/follower/:userId', isLoggedIn, async (req, res, next) => {
  // DELETE /user/follower/2
  try {
    const user = await User.findOne({ where: { id: req.params.userId } });
    if (!user) {
      res.status(403).send('존재하지 않는 사용자 입니다.');
    }
    await user.removeFollowings(req.user.id);
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// GET /user/followers 팔로워 목록 가져오기
router.get('/followers', isLoggedIn, async (req, res, next) => {
  // GET /user/followers
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (!user) {
      res.status(403).send('존재하지 않는 사용자 입니다.');
    }
    const followers = await user.getFollowers();
    res.status(200).json(followers);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// GET /user/followings 팔로잉 목록 가져오기
router.get('/followings', isLoggedIn, async (req, res, next) => {
  // GET /user/followings
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (!user) {
      res.status(403).send('존재하지 않는 사용자 입니다.');
    }
    const followings = await user.getFollowings();
    res.status(200).json(followings);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// GET /user/:userId/posts 사용자별 게시글 불러오기
router.get('/:userId/posts', async (req, res, next) => {
  //GET /user/1/posts
  try {
    const user = await User.findOne({ where: { id: req.params.userId } });
    if (user) {
      const where = {};
      if (parseInt(req.query.lastId, 10)) {
        // 초기 로딩이 아닐 때
        where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
      } // 21 20 19 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
      const posts = await user.getPosts({
        where,
        limit: 10,
        include: [
          {
            model: Image,
          },
          {
            model: Comment,
            include: [
              {
                model: User,
                attributes: ['id', 'nickname'],
              },
            ],
          },
          {
            model: User,
            attributes: ['id', 'nickname'],
          },
          {
            model: User,
            through: 'Like',
            as: 'Likers',
            attributes: ['id'],
          },
          {
            model: Post,
            as: 'Retweet',
            include: [
              {
                model: User,
                attributes: ['id', 'nickname'],
              },
              {
                model: Image,
              },
            ],
          },
        ],
      });
      console.log(posts);
      res.status(200).json(posts);
    } else {
      res.status(404).send('존재하지 않는 사용자입니다.');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// GET /user/:id 특정 사용자 정보 가져오기
router.get('/:id', async (req, res, next) => {
  // GET /user/3
  try {
    const fullUserWithoutPassword = await User.findOne({
      where: { id: req.params.id },
      attributes: {
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
    if (fullUserWithoutPassword) {
      const data = fullUserWithoutPassword.toJSON();
      data.Posts = data.Posts.length;
      data.Followings = data.Followings.length;
      data.Followers = data.Followers.length;
      res.status(200).json(data);
    } else {
      res.status(404).json('존재하지 않는 사용자입니다.');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
