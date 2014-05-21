var mongojs = require('mongojs')

var db = mongojs('oauth2orize_client_credentials_example')

exports.db = function() {
    return db
}
