'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Win = new Schema({
	img: {
	    type: String,
	    required: true
	},
	owner:  { type: String, ref: 'User' },
	title: String,
	loves: {type: Number, default: 0}
});

module.exports = mongoose.model('Win', Win);