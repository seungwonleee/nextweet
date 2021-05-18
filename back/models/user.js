module.exports = (sequelize, DataTypes) => {
  // MySQL에는 users 테이블 생성
  const User = sequelize.define(
    "User",
    {
      //유저별 식별 id는 MySQL에서 자동으로 입력해준다.
      email: {
        type: DataTypes.STRING(50),
        allowNull: false, //필수
        unique: true, // 고유한 값
      },
      nickname: {
        type: DataTypes.STRING(30),
        allowNull: false, //필수
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false, //필수
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci", // 한글 저장
    }
  );
  User.associate = (db) => {};
  return User;
};
