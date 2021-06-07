const express = require('express');
const { Post, User, Image, Comment } = require('../models');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      limit: 10,
      order: [
        ['createdAt', 'DESC'], //최신 게시글부터 가져옴
        [Comment, 'createdAt', 'ASC'], // 오래된 댓글부터 가져옴
      ],
      include: [
        {
          model: User,
          attributes: ['id', 'nickname'], // User 정보 중 비밀번호를 제외한 id, nickname만 전달
        },
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['id', 'nickname'],
            },
          ],
        },
      ],
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
