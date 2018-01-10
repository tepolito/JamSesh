// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var songSchema = mongoose.Schema({

    songname:  String,

    song:      Array,

    createdBy: String

});

// create the model for users and expose it to our app
module.exports = mongoose.model('Song', songSchema);