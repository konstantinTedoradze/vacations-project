const jwt = require("jsonwebtoken");
const config = require("../config.json");
let { secret } = config;

function extractUserDataFromCache(request) {
  let authorizationString = request.headers["authorization"];
  // Removing the bearer prefix, leaving the clean token
  let token = authorizationString.substring("Bearer ".length);
  const userDetails = {};
  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      userDetails.id = decoded.id;
      userDetails.user_type = decoded.user_type;
    });
  } else {
    response.sendStatus(401);
  }

  return userDetails;
}
function onlyAdmins(request, response, next) {
  const userDetails = extractUserDataFromCache(request);
  if (userDetails.user_type === "ADMIN") {
    next();
  } else {
    response.sendStatus(401);
  }
}
function onlyUsers(request, response, next) {
  const userDetails = extractUserDataFromCache(request);
  if (userDetails.user_type === "CUSTOMER") {
    next();
  } else {
    response.sendStatus(401);
  }
}

module.exports = {
  extractUserDataFromCache,
  onlyUsers,
  onlyAdmins,
};
