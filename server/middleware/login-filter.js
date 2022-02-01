const expressJwt = require('express-jwt');
const config = require('../config.json');

// Extracting the text from the secret's JSON
let { secret } = config;

let whiteListUrls = new Set();
whiteListUrls.add('/login');
whiteListUrls.add('/register');

//console.log(secret);

function authenticateJwtRequestToken() {
    // Load secret into 
    // return expressJwt({ secret, algorithms: ['sha1', 'RS256', 'HS256']}).unless({
    //     path: [
    //         // public routes that don't require authentication
    //         '/users/login',
    //         '/users/register',
    //         '/users/forgotPassword'
    //     ]
    // });
    return expressJwt({ secret, algorithms: ['sha1', 'RS256', 'HS256'] }).unless(request => {
        // console.log("Method = " + request.method);
        // console.log("request.url = " + request.url);
        // console.log(request.user_type, 'requessssst');

        // if (request.method == 'POST' && request.url.endsWith('/users')) {
        //     console.log("Returned true")
        //     return true;
        // }

        // If the url resides in our whitelist urls
        if (whiteListUrls.has(request.url)) {
            return true;
        }

        return false;

    });
}


module.exports = authenticateJwtRequestToken;