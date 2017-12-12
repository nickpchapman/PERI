const mongoose = require('mongoose');

const User = mongoose.Schema;
const Trips = mongoose.Schema;
const Spot = mongoose.Schema;
const Forked = mongoose.Schema;

const userSchema = new User({
  username: {
    type: String,
    unique: true
  },
  sessionID: String,
})

const tripSchema = new Trips({
  username: String,
  tripName: String,
  destination: String,
  description: String,
  thumbnail: String,
  spots: [{spotID: Number}] //save the spots ID in here
})

const spotSchema = new Spot({
  tripID: String,
  spotName: String,
  description: String,
  long: Number,
  lat: Number,
  elevation: Number,
  photo: String
})

const forkedSchema = new Forked({
  userID: String,
  destination: String,
  spots: [{spotID: Number}]
})

module.exports.User = mongoose.model('User', userSchema);
module.exports.Trip = mongoose.model('Trip', tripSchema);
module.exports.Spot = mongoose.model('Spot', spotSchema);
module.exports.Fork = mongoose.model('Fork', forkedSchema);
