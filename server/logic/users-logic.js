const usersDao = require("../dao/users-dao");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const config = require("../config.json");
let ErrorType = require("./../errors/error-type");
let ServerError = require("./../errors/server-error");

const saltRight = "asdfkjasgdjk";
const saltLeft = "--msags/?;@#afsd";

async function addUser(registrationData) {
  await validateUserDetails(registrationData);
  if (await usersDao.isUserExist(registrationData)) {
    throw new ServerError(ErrorType.USER_NAME_ALREADY_EXIST);
  }
  await encodePassword(registrationData);
  return await usersDao.registrateUser(registrationData);
}

async function loginUser(loginData) {
  let user;
  const foundUser = await usersDao.checkLogIn(loginData);
  if (foundUser.length) {
    user = foundUser[0];
  } else {
    throw new ServerError(ErrorType.USER_NOT_FOUND);
  }
  const userData = {
    user_type: user.user_type,
    first_name: user.first_name,
  };
  const token = jwt.sign(
    { id: user.id, user_type: user.user_type },
    config.secret,
    { expiresIn: "7d" }
  );
  const userLoginData = { userData, token };
  return userLoginData;
}

async function loginLogic(loginData) {
  if (!loginData.userName || loginData.userName === "") {
    throw new ServerError(ErrorType.INVALID_USER_NAME);
  }
  if (!loginData.password || loginData.password === "") {
    throw new Error(ErrorType.INVALID_PASSWORD);
  }
  await encodePassword(loginData);
  const loggedInUser = await loginUser(loginData);
  return loggedInUser;
}

async function registrationLogic(registrationData) {
  return await usersDao.checkUserRegistered(registrationData);
}

async function validateUserDetails(registrationData) {
  if (!registrationData.userName || registrationData.userName === "") {
    throw new ServerError(ErrorType.INVALID_USER_NAME);
  }
  if (!registrationData.password || registrationData.password === "") {
    throw new Error(ErrorType.INVALID_PASSWORD);
  }
  if (!registrationData.firstName || registrationData.firstName === "") {
    throw new Error(ErrorType.INVALID_FIRST_NAME);
  }

  if (!registrationData.lastName || registrationData.lastName === "") {
    throw new Error(ErrorType.INVALID_LAST_NAME);
  }
}

async function encodePassword(registrationData) {
  registrationData.password = crypto
    .createHash("md5")
    .update(saltLeft + registrationData.password + saltRight)
    .digest("hex");
}

async function getUser(userId) {
  const user = await usersDao.getUser(userId);
  if (user && user.length) {
    return user[0];
  } else {
    throw new ServerError(ErrorType.USER_NOT_FOUND);
  }
}
async function validateUser(userData) {
  const foundUser = await usersDao.getUserPassword(userData.userId);
  await encodePassword(userData.userDetails);
  if (foundUser[0].password &&  
      userData.userDetails.password && 
      foundUser[0].password === userData.userDetails.password) {
    return true;
  } else {
    throw new ServerError(ErrorType.INVALID_PASSWORD);
  }
}
async function updateUser(userData) {
  return await usersDao.updateUser(userData);
}
async function deleteUser(userId) {
  return await usersDao.deleteUser(userId);
}

module.exports = {
  addUser,
  loginUser,
  registrationLogic,
  loginLogic,
  getUser,
  validateUser,
  updateUser,
  deleteUser
};
