const moment = require("moment");

function formatRoll(username, text) {
  return {
    username,
    text,
    time: moment().format("h:mm a")
  };
}

module.exports = formatRoll;