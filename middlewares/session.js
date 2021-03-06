const config = require('../config.js')
const Redis = require('ioredis')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)

const client = new Redis(config.REDIS_OPTIONS)
//TODO look into making the session cookie safer by:
//[done]Using length and random session ID to prevent brute force attack. The recc length is 128 bits
//[done]session ID without user specific data. The data should be a random string of characters without meaning
//[done]HTTPS communication only. No http.
//[done]Secure and HTTPonly cookies. All session cookies should be created with secure and HTTPonly attributes
//Manage sessions. Destroy sessions upon closin gbrowser, timeout[done], logout, or log-in from a separate location.
const redSession = session({
    ...config.SESSION_OPTIONS, 
    store: new RedisStore({ 
        client 
    }),
})

module.exports = redSession