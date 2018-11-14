const express = require('express');
const parcels = require('../resources/PARCELS.json');

const parcelsApp = express();
parcelsApp.get('/', (req, res) => {
  res.status(200).send(parcels);
});

module.exports = parcelsApp;
