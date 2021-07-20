const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();

const { Post, Image, Comment, User, Hashtag } = require('../models');
const { isLoggedIn } = require('./middlewares');

try {
  fs.accessSync('uploads');
} catch (error) {
  console.log('폴더가 존재하지 않으므로 uploads 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads');
    },
    filename(req, file, done) {
      //기존 파일을 덮어쓰지 않기위해서 업로드 날짜 붙이기
      const ext = path.extname(file.originalname); // 확장자 추출(.png)
      const basename = path.basename(file.originalname, ext);
      done(null, basename + '_' + new Date().getTime() + ext); // 사진명14523423.png
    },
    limits: { fileSize: 20 * 1024 * 1024 }, // 업로드 20MB 제한
  }),
});

// 게시글 작성
router.post('/', isLoggedIn, upload.none(), async (req, res, next) => {
  try {
    const hashtags = req.body.content.match(/#[^\s#]+/g);

    //생성과 동시에 데이터가 post에 담긴다.
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });

    if (hashtags) {
      const result = await Promise.all(
        hashtags.map((tag) =>
          Hashtag.findOrCreate({
            where: { name: tag.slice(1).toLowerCase() },
          })
        )
      ); // [[해쉬태그, true], [없는경우, true]]
      await post.addHashtags(result.map((hashtag) => hashtag[0]));
    }

    if (req.body.image) {
      if (Array.isArray(req.body.image)) {
        // 이미지를 여러개 올리면 image: [사진1.png, 사진2.png]
        const images = await Promise.all(
          req.body.image.map((image) => Image.create({ src: image }))
        );
        await post.addImages(images);
      } else {
        // 이미지를 하나만 올리면 image: 사진1.png
        const image = await Image.create({ src: req.body.image });
        await post.addImages(image);
      }
    }
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User, // 댓글 작성자
              attributes: ['id', 'nickname'],
            },
          ],
        },
        {
          model: User, // 게시글 작성자
          attributes: ['id', 'nickname'],
        },
        {
          model: User, // 좋아요 누른사람
          as: 'Likers',
          attributes: ['id'],
        },
      ],
    });
    res.status(201).json(fullPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 게시글 수정(업데이트)
router.patch('/:postId', isLoggedIn, async (req, res, next) => {
  // PATCH /post/1
  const hashtags = req.body.content.match(/#[^\s#]+/g);
  try {
    await Post.update(
      {
        content: req.body.content,
      },
      {
        where: {
          id: req.params.postId,
          UserId: req.user.id,
        },
      }
    );
    const post = await Post.findOne({ where: { id: req.params.postId } });
    if (hashtags) {
      const result = await Promise.all(
        hashtags.map((tag) =>
          Hashtag.findOrCreate({
            where: { name: tag.slice(1).toLowerCase() },
          })
        )
      ); // [[item1, true], [item2, true]]
      await post.setHashtags(result.map((v) => v[0]));
    }
    res.status(200).json({
      PostId: parseInt(req.params.postId, 10),
      content: req.body.content,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 게시글별 댓글 작성, 삭제
router.post('/:postId/comment', isLoggedIn, async (req, res, next) => {
  try {
    // 댓글 작성
    if (!req.body.commentId) {
      const post = await Post.findOne({
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
      const fullComment = await Comment.findOne({
        where: { id: comment.id },
        include: [
          {
            model: User,
            attributes: ['id', 'nickname'],
          },
        ],
      });
      res.status(201).json(fullComment);
    } else {
      // 댓글 삭제
      const deleteComment = await Comment.destroy({
        where: { id: req.body.commentId },
      });
      // 없는 댓글을 삭제할 경우
      if (!deleteComment) {
        return res.status(403).send('존재하지 않는 댓글입니다.');
      }

      res.status(201).json({
        PostId: req.body.postId,
        CommentId: req.body.commentId,
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 게시글의 댓글 수정(업데이트)
router.patch('/:postId/comment', isLoggedIn, async (req, res, next) => {
  try {
    // 게시글 댓글 전체 조회
    const comments = await Comment.findAll({
      where: { PostId: req.body.postId },
    });
    // 특정 댓글만 조회
    const comment = comments.find(
      (v) => v.dataValues.id === req.body.commentId
    );
    // 없는 댓글을 수정할 경우
    if (!comment) {
      return res.status(403).send('존재하지 않는 댓글입니다.');
    }
    // 30자 이상 제한
    if (req.body.updateComment.length > 30) {
      return res.status(403).send('30글자 이상 입력할 수 없습니다.');
    }
    // 댓글 업데이트
    const updateComment = await comment.update({
      content: req.body.updateComment,
    });
    res.status(201).json(updateComment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.patch('/:postId/like', isLoggedIn, async (req, res, next) => {
  // PATCH /post/1/like
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } });
    if (!post) {
      return res.status(403).send('게시글이 존재하지 않습니다.');
    }
    await post.addLikers(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete('/:postId/like', isLoggedIn, async (req, res, next) => {
  // DELETE /post/1/like
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } });
    if (!post) {
      return res.status(403).send('게시글이 존재하지 않습니다.');
    }
    await post.removeLikers(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete('/:postId', isLoggedIn, async (req, res, next) => {
  // DELETE /post/10
  try {
    //게시글을 참조하고있는 모든 사진경로 삭제
    await Image.destroy({
      where: { PostId: req.params.postId },
    });
    //게시글을 참조하고있는 모든 댓글 삭제
    await Comment.destroy({
      where: { PostId: req.params.postId },
    });
    await Post.destroy({
      where: { id: req.params.postId, UserId: req.user.id },
    });

    res.status(200).json({ PostId: parseInt(req.params.postId, 10) }); //params는 문자열로 취급된다.
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post(
  '/images',
  isLoggedIn,
  upload.array('image'), // 사진 한장만 올리게 하려면 single 메서드 사용
  async (req, res, next) => {
    //POST /post/images
    console.log(req.files); //업로드된 이미지 정보들이 들이었다.
    res.json(req.files.map((v) => v.filename));
  }
);

router.post('/:postId/retweet', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
      include: [
        {
          model: User,
          attributes: ['id', 'nickname'],
        },
      ],
    });
    //없는 게시글에 댓글 작성할 경우
    if (!post) {
      return res.status(403).send('존재하지 않는 게시글입니다.');
    }
    //자신이 작성한 게시글과 자신의 글을 리트위한 게시물을 다시 리트윗하는것을 방지한다.
    if (
      req.user.id === post.UserId ||
      (post.Retweet && post.Retweet.UserId === req.user.id)
    ) {
      return res.status(403).send('자신의 글은 리트윗할 수 없습니다.');
    }
    //한번 리트윗한 게시글을 두번 리트윗하는것을 방지한다.
    const retweetTargetId = post.RetweetId || post.id;
    const exPost = await Post.findOne({
      where: {
        UserId: req.user.id,
        RetweetId: retweetTargetId,
      },
    });
    if (exPost) {
      return res.status(403).send('이미 리트윗했습니다.');
    }
    const retweet = await Post.create({
      UserId: req.user.id,
      RetweetId: retweetTargetId,
      content: 'retweet',
    });
    const retweetWithPrevPost = await Post.findOne({
      where: { id: retweet.id },
      include: [
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
        {
          model: User,
          attributes: ['id', 'nickname'],
        },
        {
          model: User,
          as: 'Likers',
          attributes: ['id', 'nickname'],
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

    res.status(201).json(retweetWithPrevPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/:postId', async (req, res, next) => {
  //GET /post/1
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    //없는 게시글을 찾을경우
    if (!post) {
      return res.status(404).send('존재하지 않는 게시글입니다.');
    }

    const singlePost = await Post.findOne({
      where: { id: post.id },
      include: [
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
        {
          model: User,
          attributes: ['id', 'nickname'],
        },
        {
          model: User,
          as: 'Likers',
          attributes: ['id', 'nickname'],
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
    res.status(200).json(singlePost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
