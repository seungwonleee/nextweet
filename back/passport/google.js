const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const { User } = require('../models');
const bcrypt = require('bcrypt');

const dotenv = require('dotenv');
dotenv.config();

module.exports = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.REDIRECT_URIS,
      },
      async (accessToken, refreshToken, profile, done) => {
        // console.log(accessToken, refreshToken, profile);
        // 구글 사용자 정보
        const googleId = profile.id;
        const googleEmail = profile.emails[0].value;
        let displayName = profile.displayName;

        try {
          // email 중복 체크
          const existedUser = await User.findOne({
            where: { email: googleEmail },
          });

          // 구글 email 과 동일한 email 계정이 없다면 회원가입
          if (!existedUser) {
            // nickname 중복 체크
            const existedNickname = await User.findOne({
              where: {
                nickname: displayName,
              },
            });
            // 중복 nickname이 존재하는 경우 뒤에 2를 붙여준다.
            if (existedNickname) {
              displayName = displayName + '2';
            }

            // DB 규칙에 비밀번호가 필수이기 때문에 googleId로 대신 저장
            const hashedGoogleId = await bcrypt.hash(googleId, 12);
            const user = await User.create({
              email: googleEmail,
              nickname: displayName,
              password: hashedGoogleId,
              googleId: googleId,
            });

            //회원정보 담은 객체 user.dataValues를 serializeUser로 첫번째 인자로 전달
            return done(null, user.dataValues);
          }

          // 이미 가입되어있는 이메일이 존재하는 경우 동일한 사용자로 판단해서 처리
          const user = await User.findOne({
            where: { email: googleEmail },
          });

          //user 정보를 serializeUser로 첫번째 인자로 전달
          return done(null, user.dataValues);
        } catch (error) {
          console.log(error);
          return done(error, false); // 서버측 에러
        }
      }
    )
  );
};
