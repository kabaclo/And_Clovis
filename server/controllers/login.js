const crypto = require('crypto');
const users = require('../resources/USERS.json');

const login = (params = {}) => {
  const { username = '', password = '' } = params;
  const response = {
    success: false,
  };
  if (!(username in users)) {
    response.message = 'User does not exist';
    return response;
  }
  const user = users[username];
  const passwordHash = crypto.createHash('sha256').update(password).digest('hex');
  if (passwordHash === user.secret) {
    response.user = {
      username,
      email: user.email,
      names: user.names,
      privileges: user.privileges,
    };
    response.success = true;
  } else {
    response.message = 'Wrong password';
  }
  return response;
};
module.exports = login;
