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
  User.associate = (db) => {
    db.User.hasMany(db.Post); // User와 Post는 1:N 관계
    db.User.hasMany(db.Comment);
    db.User.belongsToMany(db.Post, {
      through: "Like",
      as: "Liked",
    }); // 사용자가 좋아요 누른 게시글들
    db.User.belongsToMany(db.User, {
      through: "Follow", // 테이블명
      as: "Followers", // 별칭
      foreignKey: "FollowingId", // 컬럼명
    });
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followings",
      foreignKey: "FollowerId",
    });
  };
  return User;
};
