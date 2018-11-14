const parcels = require('../resources/PARCELS.json');

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

module.exports = getUserParcels;
