const passport = require('passport');
const local = require('./local');
const { User } = require('../models');

module.exports = () => {
  passport.serializeUser((user, done) => {
    //메모리 관리를 위해 서버에 cookie와 사용자 id만 들고있게한다.
    done(null, user.id);
  });

  //로그인 후 요청마다 cookie와 함께 전달해서 db에서 사용자 정보 복구
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
