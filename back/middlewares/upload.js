const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const path = require('path');

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY_ID,
  region: 'ap-northeast-2',
});

const uploadImage = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: 'nextweet',
    key(req, file, cb) {
      cb(null, `original/${Date.now()}_${path.basename(file.originalname)}`);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, //20mb 용량 제한
});

module.exports = { uploadImage };
