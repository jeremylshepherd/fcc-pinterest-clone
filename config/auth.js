
// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'twitterAuth' : {
        'consumerKey'         : process.env.TWITTER_CONSUMER,
        'consumerSecret'     : process.env.TWITTER_SECRET,
        'callbackURL'      : process.env.APP_URL + 'auth/twitter/callback'
    }

};