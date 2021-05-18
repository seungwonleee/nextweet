module.exports = (sequelize, DataTypes) => {
  // MySQL에는 images 테이블 생성
  const Image = sequelize.define(
    "Image",
    {
      //image별 식별 id는 MySQL에서 자동으로 입력해준다.
      src: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci", // 한글 저장
    }
  );
  Image.associate = (db) => {};
  return Image;
};
