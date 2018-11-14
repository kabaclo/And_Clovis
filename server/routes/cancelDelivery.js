const express = require('express');
const parcels = require('../resources/PARCELS.json');

const cancelDelivery = express();
cancelDelivery.get('/:id/cancel', (req, res) => {
  const { id } = req.params;
  if (id in parcels) {
    parcels[id].status = 'Cancel';
    return res.status(200).send(parcels[id]);
  }
  return res.status(200).send('The inputed parcel id was not found');
});

module.exports = cancelDelivery;
