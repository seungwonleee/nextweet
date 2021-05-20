const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { User } = require("../models");

router.post("/", async (req, res, next) => {
  console.log(req.body);
  try {
    // 중복 email 체크
    const existedUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    // 중복 nickname 체크
    const existedNickname = await User.findOne({
      where: {
        nickname: req.body.nickname,
      },
    });

    if (existedUser) {
      return res.status(403).send("이미 사용중인 아이디 입니다.");
    }
    if (existedNickname) {
      return res.status(403).send("이미 사용중인 닉네임 입니다.");
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });
    res.status(201).json({ signUpSuccess: true });
  } catch (error) {
    console.log(error);
    next(error); // status 500 서버측 에러
  }
});

module.exports = router;
