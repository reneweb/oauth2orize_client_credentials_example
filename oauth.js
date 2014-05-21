var oauth2orize = require('oauth2orize')
    , passport = require('passport')
    , db = require('./db').db()
    , crypto = require('crypto')
    , utils = require("./utils")
    , bcrypt = require('bcrypt')

// create OAuth 2.0 server
var server = oauth2orize.createServer();

//Client Credentials
server.exchange(oauth2orize.exchange.clientCredentials(function(client, scope, done) {
    var token = utils.uid(256)
    var tokenHash = crypto.createHash('sha1').update(token).digest('hex')
    var expirationDate = new Date(new Date().getTime() + (3600 * 1000))

    db.collection('accessTokens').save({token: tokenHash, expirationDate: expirationDate, clientId: client.clienId, scope: scope}, function(err) {
        if (err) return done(err)
        return done(null, token, {expires_in: expirationDate})
    })
}))

// token endpoint
exports.token = [
    passport.authenticate(['clientBasic', 'clientPassword'], { session: false }),
    server.token(),
    server.errorHandler()
]

