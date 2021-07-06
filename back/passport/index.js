const passport = require('passport');
const local = require('./local');
const { User } = require('../models');

module.exports = () => {
  //서버 메모리에 cookie와 사용자 id만 저장
  passport.serializeUser((user, done) => {
    //done 호출시 res.setHeader cookie 전달
    done(null, user.id);
  });

  //로그인 후 요청마다 cookie와 user의 id정보로 db에서 사용자 정보 복구
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({ where: { id } });
      done(null, user); // req.user
    } catch (err) {
      console.error(err);
      done(err);
    }
  });

  local();
};
