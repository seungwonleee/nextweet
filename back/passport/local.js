const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');
const { User } = require('../models');

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email, password, done) => {
        try {
          // 계정 확인
          const user = await User.findOne({
            where: { email },
          });

          // 계정이 없는 경우
          if (!user) {
            // done으로 결과 판단
            // 인자 첫번째 서버에러, 두번째 성공, 세번째 client 에러(사용자 실수)
            return done(null, false, {
              reason: '존재하지 않는 사용자 입니다.',
            });
          }

          // 계정이 있는 경우 비밀번호 검사
          const result = await bcrypt.compare(password, user.password);

          //비밀번호 일치시 result -> true
          if (result) {
            return done(null, user);
          }
          //비밀번호 불일치
          return done(null, false, { reason: '비밀번호가 틀렸습니다.' });
        } catch (error) {
          //서버 에러 시 이곳으로
          console.error(error);
          return done(error);
        }
      }
    )
  );
};
