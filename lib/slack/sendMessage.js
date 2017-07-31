const Slack = require('@slack/client').WebClient;
const clone = require('lodash/clone');

const sendMessage = (token, channelOrUser, message) => {
  const slack = new Slack(token);
  let text = message;
  let options = {};
  if (typeof message === 'object') {
    text = message.text;
    options = clone(message);
    delete options.text;
  }
  return new Promise((resolve, reject) => {
    const callback = (err, { channel, ts }) => {
      if (err) return reject(err);
      return resolve({ channel, timestamp: ts });
    };
    slack.chat.postMessage(channelOrUser, text, options, callback);
  });
};

module.exports = sendMessage;
