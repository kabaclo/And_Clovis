const express = require('express');
const bodyParser = require('body-parser');
const parcels = require('../resources/PARCELS.json');

const createParcelDelivery = express();
createParcelDelivery.use(bodyParser.json());


createParcelDelivery.post('/parcels', (req, res) => {
  const id = `id-${Math.random().toString(36).substr(2, 16)}`;

  parcels[id] = {
    sender: req.body.sender,
    parcelName: req.body.parcelName,
    from: req.body.from,
    destination: req.body.destination,
    current_location: req.body.current_location,
    weight: req.body.weight,
    length: req.body.length,
    submission_date: req.body.submission_date,
    arrival_date: req.body.arrival_date,
    status: req.body.status,
  };

  return res.status(200).send(parcels);
});
module.exports = createParcelDelivery;

