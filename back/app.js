const express = require("express");
const app = express();
const db = require("./models");

db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch(console.error);

app.get("/api/post", (req, res) => {
  res.json([
    { id: 1, content: "post content1" },
    { id: 2, content: "post content2" },
    { id: 3, content: "post content3" },
  ]);
});

app.listen(5000, () => {
  console.log("server running...");
});
