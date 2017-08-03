const s3 = require('./s3');
const slack = require('./slack');
const models = require('./models');

module.exports = {
  s3,
  slack,
  models
};
