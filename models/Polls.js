'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Poll = new Schema({
	title: {
	    type: String,
	    required: true
	},
	author:  { type: Number, ref: 'User' },
	options: [{
		label: String, 
		votes: {
				type: Number, 
				default: 0
			}
		}]
});

module.exports = mongoose.model('Poll', Poll);