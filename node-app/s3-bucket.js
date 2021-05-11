// import libraries
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3')
const dotenv = require('dotenv');
const { nanoid } = require('nanoid');

// get config vars
dotenv.config();

const ACCESS_KEY_ID = process.env.AWSAccessKeyId;
const SECRET_ACCESS_KEY = process.env.AWSSecretKey;
const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;
const URL = process.env.AWS_S3_URL;

// Set the Region
AWS.config.update({
  accessKeyId: ACCESS_KEY_ID,
  secretAccessKey: SECRET_ACCESS_KEY,
  region: 'us-east-2'
});

const s3 = new AWS.S3();

exports.upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: BUCKET_NAME,
        key: function (req, file, cb) {
          let newFileName = nanoid(); // for unique file keys
          req.newURL = URL + newFileName;
          cb(null, newFileName);
        },
        contentType: function (req, file, cb) {
          cb(null, file.mimetype);
        },
        acl: 'public-read'
    })
});
