'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var User = new Schema({
	local:{
        email: String,
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        fullName: String,
        city: String,
        state: String,
        zip: Number,
        created: Date
    },
    requests: [{
        book: { type: String, ref: 'Book' },
        borrower: { type: String, ref: 'User' },
        status: {type: String, default: 'Pending'},
        due: Date
    }],
    trades:[{
        book: { type: Schema.Types.ObjectId, ref: 'Book' },
        owner: { type: String, ref: 'User' },
        status: String,
        due: Date
    }]
});

User.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
User.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', User);