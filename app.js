
const express = require('express');

const crypto = require('crypto');
const parcels = require('./resources/PARCELS.json');
const users = require('./resources/USERS.json');


const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  return next();
});

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

app.get('/api/v1/user/login/:username/:password', (req, res) => {
  try {
    const response = login({
      username: req.params.username,
      password: req.params.password,
    });
    res.send(response);
  } catch (error) {
    res.send({
      success: false,
      error,
    });
  }
});

/** Registering user endpoint */
app.post('/api/v1/user/register/', (req, res) => {
  const response = {
    success: false,
  };
  const matchEmail = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;

  if (!(matchEmail.exec(req.body.email))) {
    response.message = 'invalid email';
    res.send(response);
    return;
  }
  if (req.body.password !== req.body.verifyPassword) {
    response.message = 'password does not match';
    res.send(response);
    return;
  }
  const user = {
    email: req.body.email,
    names: req.body.names.toUpperCase(),
    password: crypto.createHash('sha256').update(req.body.password).digest('hex'),
  };
  response.success = true;
  response.user = {
    email: user.email,
    names: user.names,
  };
  users[req.body.username] = user;

  res.send(response);
});
/** Parcels endpoints */
/* loading parcels from a file */

const getUserParcels = (params = {}) => {
  const { username = null } = params;
  const userParcels = {};
  Object.entries(parcels).forEach(([parcelId, parcel]) => {
    if (parcel.sender === username) {
      userParcels[parcelId] = parcel;
    }
  });
  return userParcels;
};

app.get('/api/v1/parcels/:username/:password', (req, res) => {
  const loginResponse = login({
    username: req.params.username,
    password: req.params.password,
  });
  const response = {
    success: false,
  };

  if (!loginResponse.success) {
    response.message = 'user not allowed';
  } else if (loginResponse.user.privileges !== 'admin') {
    response.data = getUserParcels({ username: loginResponse.user.username });
  } else {
    response.data = parcels;
    response.success = true;
  }
  res.send(response);
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  // console.log (`listening on port ${port}...`);
});
