const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => res.status(200).send('Welcome to Clovis\' API'));

app.use('/api/v1/parcels', require('./routes/parcels'));
app.use('/api/v1/parcels', require('./routes/searchParcel'));
app.use('/api/v1/users/', require('./routes/searchParcelByUser'));
app.use('/api/v1/parcels/', require('./routes/cancelDelivery'));
app.use('/api/v1', require('./routes/createParcelDelivery'));
app.use('/api/v1/user/login', require('./routes/user'));


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
