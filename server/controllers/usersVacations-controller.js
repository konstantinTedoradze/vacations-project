const vacationsLogic = require("../logic/usersVacations-logic");
const express = require("express");
// const { request } = require("express");
const {extractUserDataFromCache, onlyUsers} = require("../utils/authoriseUserDetails");

const router = express.Router();

router.get("/", onlyUsers, async (request, response,next) => {
  const userDetails = extractUserDataFromCache(request);
  const userId = userDetails.id;
  // const userId = request.params.id
  try {
    const vacations = await vacationsLogic.getAllVacations(userId);

    response.json(vacations);
  } catch (error) {
    console.log(error);
    return next(error)
  }
});

router.post("/follow",onlyUsers,  async (request, response, next) => {
  // Extracting the JSON from the packet's BODY
  const userDetails = extractUserDataFromCache(request);
  const userId = userDetails.id;
  let followedVacationData = request.body;
  followedVacationData.userId = userId

  try {
    await vacationsLogic.followVacation(followedVacationData);
    response.json();
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

router.post("/unfollow", onlyUsers, async (request, response, next) => {
  // Extracting the JSON from the packet's BODY
  const userDetails = extractUserDataFromCache(request);
  const userId = userDetails.id;  
  let unFollowedVacationData = request.body;
  unFollowedVacationData.userId = userId

  try {
    await vacationsLogic.unFollowVacation(unFollowedVacationData);
    response.json();
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

module.exports = router;
