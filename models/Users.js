'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var User = new Schema({
	github: {
		id: String,
		token: String,
		displayName: String,
		username: String,
        publicRepos: Number,
        created: Date
	},
	google: {
        id: String,
        token: String,
        email: String,
        name: String,
        created: Date
    },
    twitter: {
        id: String,
        token: String,
        displayName: String,
        username: String,
        created: Date
    },
    facebook:{
        id: String,
        token: String,
        name: String,
        created: Date
    },
    local:{
        id: Number,
        email: String,
        password: String,
        firstName: String,
        lastName: String,
        fullName: String,
        created: Date
    },
    polls: [{ type: Schema.Types.ObjectId, ref: 'Poll' }]
});

User.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
User.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', User);