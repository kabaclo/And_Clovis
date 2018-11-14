const express = require('express');
const getUserParcels = require('../controllers/getUserParcels');

const searchParcelsByUserApp = express();
searchParcelsByUserApp.get('/:username/parcels', (req, res) => {
  const { username } = req.params;
  const response = getUserParcels({ username });
  if (Object.keys(response).length !== 0) return res.status(200).send(response);
  return res.status(200).send('Invalid username');
});

module.exports = searchParcelsByUserApp;
