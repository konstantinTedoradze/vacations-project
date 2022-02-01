const usersLogic = require("../logic/users-logic");
const express = require("express");
const { extractUserDataFromCache } = require("../utils/authoriseUserDetails");

const router = express.Router();

router.post("/login", async (request, response, next) => {
  // Extracting the JSON from the packet's BODY
  let userLoginData = request.body;

  try {
    const user = await usersLogic.loginLogic(userLoginData);
    if (user) {
      response.json(user);
    }
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

router.post("/register", async (request, response, next) => {
  try {
    let registrationData = request.body;
    // console.log(registrationData, 'registration_data');
    const registered = await usersLogic.addUser(registrationData);
    if (registered) {
      const registeredUser = await usersLogic.registrationLogic(
        registrationData
      );
      if (registeredUser) {
        // console.log(registeredUser.username,registeredUser.password,"username and password!!!");
        const userInfo = {
          userName: registeredUser.username,
          password: registeredUser.password,
        };
        // login
        const user = await usersLogic.loginUser(userInfo);
        if (user) {
          response.json(user);
        }
      }
    }
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

router.get("/user", async (request, response, next) => {
  const userDetails = extractUserDataFromCache(request);
  const userId = userDetails.id;
  try {
    const user = await usersLogic.getUser(userId);
    if (user) {
      response.json(user);
    }
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

router.put("/user/update", async (request, response, next) => {
  const userDetails = extractUserDataFromCache(request);
  const userId = userDetails.id;
  let userData = {
    userId,
    userDetails: request.body
  };

  try {
    // console.log(registrationData, 'registration_data');
    const userValidated = await usersLogic.validateUser(userData);
    if (userValidated) {
      const userUpdated = await usersLogic.updateUser(userData);
      if(userUpdated){
        response.json();
      }
    }
    // if user validated - update
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

router.delete("/user/delete", async (request, response, next) => {
  const userDetails = extractUserDataFromCache(request);
  const userId = userDetails.id;
  try {
    const userDeleted = await usersLogic.deleteUser(userId);
    if (userDeleted) {
        response.json();
    }
    // if user validated - update
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

module.exports = router;
