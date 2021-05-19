module.exports = (sequelize, DataTypes) => {
  // MySQL에는 hashtags 테이블 생성
  const Hashtag = sequelize.define(
    "Hashtag",
    {
      //hagtag별 식별 id는 MySQL에서 자동으로 입력해준다.
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
    },
    {
      charset: "utf8mb4", // 이모티콘 사용하려면 mb4 작성
      collate: "utf8mb4_general_ci", // 한글, 이모티콘 저장
    }
  );
  Hashtag.associate = (db) => {
    db.Hashtag.belongsToMany(db.Post, {
      through: "PostHashtag",
      as: "Posts",
    });
  };
  return Hashtag;
};
