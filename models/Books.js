'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Book = new Schema({
	title: {
	    type: String,
	    required: true
	},
	owner:  { type: String, ref: 'User' },
	cover: String,
	author: String,
	status: {type: String, default: 'Available'},
	ISBN: [{format: String, identifier: String}],
	description: String,
	due: {type: Date, default: null}
});

module.exports = mongoose.model('Book', Book);