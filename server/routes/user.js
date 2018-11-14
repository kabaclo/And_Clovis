const express = require('express');
const login = require('../controllers/login');

const loginApp = express();

loginApp.get('/:username/:password', (req, res) => {
  try {
    const response = login({
      username: req.params.username,
      password: req.params.password,
    });
    res.status(200).send(response);
  } catch (error) {
    res.status(200).send({
      success: false,
      error,
    });
  }
});

module.exports = loginApp;
