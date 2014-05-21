oauth2orize_client_credentials_example
======================================

This is an example of the oAuth client credentials flow using oauth2orize, express 4 and mongoDB.

##### Installation

```
git clone https://github.com/reneweb/oauth2orize_client_credentials_example.git
npm install
node app.js
```
Note: You may need to change the database configuration in the db.js file, if mongoDB doesn't run using the default port or is not running on localhost.

##### Usage (with cURL)

###### 0 - Create a client

First of all you need to create a client in the clients collection, for example, with the mongo shell. The client should have a clientId and a clientSecret.
For example:
{"clientId" : "test", "clientSecret" : "secret", "trustedClient" : true}

###### 1 - Get an access token

```
curl -v -H "Content-Type: application/json" -X POST <IP>:<PORT>/oauth/token -u <clientId>:<clientSecret> -d '{"grant_type": "token"}'
```

###### 2 - Access a restricted resource using the access token

```
curl -X GET <IP>:<PORT>/restricted -v -H "Authorization: Bearer <accessToken>"
```
