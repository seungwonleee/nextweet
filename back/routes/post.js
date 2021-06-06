const express = require('express');

const { Post, Image, Comment, User } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

// 게시글 작성
router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    //생성과 동시에 데이터가 post에 담긴다.
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
        {
          model: Image,
        },
        {
          model: Comment,
        },
        {
          model: User,
        },
      ],
    });
    res.status(201).json(fullPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 게시글별 댓글 작성
router.post('/:postId/comment', isLoggedIn, async (req, res, next) => {
  try {
    await Post.findOne({
      where: { id: req.params.postId },
    });
    //없는 게시글에 댓글 작성할 경우
    if (!post) {
      return res.status(403).send('존재하지 않는 게시글입니다.');
    }
    //생성과 동시에 데이터가 comment에 담긴다.
    const comment = await Comment.create({
      content: req.body.content,
      PostId: req.params.postId,
      UserId: req.user.id,
    });
    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete('/', (req, res) => {
  res.json({ id: 1 });
});

module.exports = router;
