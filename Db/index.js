//  REQUIRE
const mongoose = require('mongoose');
const { User, Trip, Spot, Fork } = require('./schema.js')

// FOR .ENV VARIABLES
require('dotenv').config();
// MONGOOSE PROMISES DEPRICATED IMPORT PROMISE
mongoose.Promise = require('bluebird');
// CONNECT MONGOOSE TO LOCAL HOST OR MLAB
mongoose.connect(
  'mongodb://localhost/peri' ||
  `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_SERVER}`,
  {userMongoClient: true});
const db = mongoose.connection;
// CONNECTION
db.on('error', console.error.bind(console, 'connection error:'));
db.once('openUri', () => {
  console.log('Successfully connected to database.');
});

const saveNewUser = (data) => {

  const newUser = new User({
    username: data.username,
    sessionID: data.sessionID
  });

  newUser.save((err) => {
    if (err) {
      return err;
    } else{
      console.log('successfully saved to the database.');
    }
  })

}

// SAVES NEW TRIP AND SPOTS WITH IDS
const saveNewTrip = (data, cb) => {
  // find the user to make sure we have the correct user
    User.findOne({username: data.username}, (err, user) => {
    if (err) {
      console.log('could not find the user'); //will add a callback here later
    } else {
    // create a new trip
      const newTrip = new Trip({
        username: data.username,
        tripName: data.tripName,
        destination: data.destination,
        description: data.description,
        thumbnail: data.thumbnail,
        spots: []
      })

      // Save the new trip
      newTrip.save((err) => {
        if (err) {
          return err;
        } else {
          console.log('succesfully saved trip') // will add callback ehre later
          // loop through the spots that was given
          console.log('data from server: ', data);
          data.spots.map((spot) => {
            // create a new spot
            const newSpot = new Spot({
              // add the tripID into each new spot
              tripID: newTrip._id,
              spotName: spot.spotName,
              description: spot.description,
              long: spot.long,
              lat: spot.lat,
              elevation: spot.elevation,
              photo: spot.photo
            });
            // before we save new spot, search for the trip and add the spots into Trip
            Trip.findById(newTrip._id, (err, trip) => {
              if (err) {
                return err;
              } else {
                trip.spots.push(newSpot._id)
                console.log('array for our trip! ', trip.spots)
                   trip.save((err) => {
                  if (err) {
                    console.log('error saving the individual spot to the trip');
                  } else {
                    console.log('successfully saved spotID to the trip');
                  }
                })
              }
            })
            // save the spot
            newSpot.save((err) => {
              if (err) {
                return err;
              } else {
                console.log('succesfully saved spot');
              }
            });
          });
        }
      });
    }
  });
}

const getTrips = (cb) => {
  Trip.find({}, (err, trips) => {
    if (err) {
      cb(err, null)
    } else {
      cb(err, trips)
    }
  })
}

const getSpots = (tripId, cb) => {
  Spot.find({'tripID': tripId}, (err, spots) => {
    if (err) {
      cb(err, null)
    } else {
      cb(err, spots)
    }
  })
}

module.exports.saveNewUser = saveNewUser;
module.exports.saveNewTrip = saveNewTrip;
module.exports.getTrips = getTrips;
module.exports.getSpots = getSpots;
