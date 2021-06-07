module.exports = (sequelize, DataTypes) => {
  // MySQL에는 posts 테이블 생성
  const Post = sequelize.define(
    'Post',
    {
      //게시글별 식별 id는 MySQL에서 자동으로 입력해준다.
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      charset: 'utf8mb4', // 이모티콘 사용하려면 mb4 작성
      collate: 'utf8mb4_general_ci', // 한글, 이모티콘 저장
    }
  );
  Post.associate = (db) => {
    db.Post.belongsTo(db.User); // belongsTo를 사용하면 UserId 컬럼이 자동적으로 생성된다. 또한 1:N 관계가 형성된다. 1(User) : N(Post)
    db.Post.hasMany(db.Comment); // Post와 Comment는 1:N 관계
    db.Post.hasMany(db.Image);
    db.Post.belongsToMany(db.Hashtag, {
      through: 'PostHashtag',
      as: 'Hashtags',
    }); // belongsToMany는 N:M 관계
    db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' }); // Post에 좋아요 누른 사람들
    db.Post.belongsTo(db.Post, { as: 'Retweet' });
  };
  return Post;
};
