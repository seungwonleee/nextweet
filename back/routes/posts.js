const express = require('express');
const { Post, User, Image, Comment } = require('../models');
const router = express.Router();
const { Op } = require('sequelize');

router.get('/', async (req, res, next) => {
  try {
    const where = {};
    //get 방식으로 query에 데이터를 담아 보내므로 req.query 사용, 초기 로딩이 아닌 경우(게시글 추가 로드)
    if (parseInt(req.query.lastId, 10)) {
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
    } // 21 20 19 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
    const posts = await Post.findAll({
      where,
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
        {
          model: User, // 좋아요 누른 사람
          as: 'Likers',
          attributes: ['id'],
        },
        {
          model: Post,
          as: 'Retweet',
          include: [
            {
              model: User,
              attributes: ['id', 'nickname'],
            },
            {
              model: Image,
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
