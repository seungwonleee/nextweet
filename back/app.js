const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./models");
const userRouter = require("./routes/user");
const passportConfig = require("./passport");

db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch(console.error);

//passport 설정
passportConfig();

// req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Access-Control-Allow-Origin
app.use(
  cors({
    origin: "*",
    credentials: false,
  })
);

app.use("/user", userRouter);

app.listen(3065, () => {
  console.log("server running...");
});
