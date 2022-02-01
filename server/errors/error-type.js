let ErrorType = {
  GENERAL_ERROR: {
    id: 1,
    httpCode: 600,
    message:
      " General error",
    isShowStackTrace: true,
  },
  USER_NAME_ALREADY_EXIST: {
    id: 2,
    httpCode: 601,
    message: "User name already exist",
    isShowStackTrace: false,
  },
  UNAUTHORIZED: {
    id: 3,
    httpCode: 401,
    message: "Login failed, invalid user name or password",
    isShowStackTrace: false,
  },
  USER_NOT_FOUND: {
    id: 4,
    httpCode: 403,
    message: "User not found",
    isShowStackTrace: false,
  },
  INVALID_USER_NAME: {
    id: 5,
    httpCode: 404,
    message: "Invalid user name",
    isShowStackTrace: false,
  },
  INVALID_PASSWORD: {
    id: 5,
    httpCode: 404,
    message: "Invalid password",
    isShowStackTrace: false,
  },
  INVALID_FIRST_NAME: {
    id: 5,
    httpCode: 404,
    message: "Invalid first name",
    isShowStackTrace: false,
  },
  INVALID_LAST_NAME: {
    id: 6,
    httpCode: 404,
    message: "Invalid last name",
    isShowStackTrace: false,
  }
};

module.exports = ErrorType;
