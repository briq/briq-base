const Slack = require('@slack/client').WebClient;
const clone = require('lodash/clone');

const updateMessage = (token, ref, message) => {
  const slack = new Slack(token);
  const { timestamp, channel } = ref;
  let text = message;
  let options = {};
  if (typeof message === 'object') {
    text = message.text;
    options = clone(message);
    delete options.text;
  }
  return new Promise((resolve, reject) => {
    const callback = (err, res) => {
      if (err) return reject(err);
      return resolve(ref);
    };
    slack.chat.update(timestamp, channel, text, options, callback);
  });
};

module.exports = updateMessage;
