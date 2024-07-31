const crypto = require('crypto');

function generateApiKey() {
  return crypto.randomBytes(16).toString('hex');
}

const messages = [];

module.exports = { generateApiKey, messages };
