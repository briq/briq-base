const aws = require('aws-sdk');
const uuid = require('uuid');

const getSignedRequest = (
  accessKeyId,
  bucketName,
  secretAccessKey,
  getFileKey
) => (req, res) => {
  const s3 = new aws.S3({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey
  });

  const { fileType } = req.query;
  const fileKey = typeof getFileKey === 'function' ? getFileKey(req) : uuid.v4();

  const s3Params = {
    Bucket: bucketName,
    Key: fileKey,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, signedRequest) => {
    if (err) {
      return res.sendStatus(500);
    }
    res.json({
      signedRequest,
      url: `https://${bucketName}.s3.amazonaws.com/${fileKey}`
    });
  });
};

module.exports = getSignedRequest;
