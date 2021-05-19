module.exports = (sequelize, DataTypes) => {
  // MySQL에는 posts 테이블 생성
  const Post = sequelize.define(
    "Post",
    {
      //게시글별 식별 id는 MySQL에서 자동으로 입력해준다.
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      charset: "utf8mb4", // 이모티콘 사용하려면 mb4 작성
      collate: "utf8mb4_general_ci", // 한글, 이모티콘 저장
    }
  );
  Post.associate = (db) => {
    db.Post.belongsTo(db.User); //belongsTo 작성시 UserId 가 저장된다.
    db.Post.belongsToMany(db.Hashtag);
    db.Post.hasMany(db.Comment);
    db.Post.hasMany(db.Image);
    db.Post.belongsToMany(db.User, { through: "Like", as: "Likers" });
    db.Post.belongsTo(db.Post, { as: "Retweet" });
  };
  return Post;
};
