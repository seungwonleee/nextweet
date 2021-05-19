module.exports = (sequelize, DataTypes) => {
  // MySQL에는 comments 테이블 생성
  const Comment = sequelize.define(
    "Comment",
    {
      //댓글별 식별 id는 MySQL에서 자동으로 입력해준다.
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
  Comment.associate = (db) => {
    db.Comment.belongsTo(db.User); //belongsTo 작성시 UserId 가 저장된다.
    db.Comment.belongsTo(db.Post); //belongsTo 작성시 PostId 가 저장된다.
  };
  return Comment;
};
