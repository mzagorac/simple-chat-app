const moment = require('moment');

const generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: moment().valueOf()
  }
}

const generateLocation = (from, lng, lat) => {
  return {
    from,
    url: `https://www.google.com/maps?q=${lng},${lat}`,
    createdAt: moment().valueOf()
  }
}

module.exports = {
  generateMessage,
  generateLocation
};