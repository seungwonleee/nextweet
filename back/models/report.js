module.exports = (sequelize, DataTypes) => {
  // MySQL에는 reports 테이블 생성
  const Report = sequelize.define(
    'Report',
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
  Report.associate = (db) => {
    db.Report.belongsTo(db.User); //신고자 id
    db.Report.belongsTo(db.Post); //신고 게시물 id
  };
  return Report;
};
