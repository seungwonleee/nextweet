const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./models");
const userRouter = require("./routes/user");

db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch(console.error);

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
