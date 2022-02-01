const vacationsLogic = require("../logic/adminVacations-logic");
const express = require("express");
const router = express.Router();
const {onlyAdmins} = require("../utils/authoriseUserDetails");


router.get("/", onlyAdmins, async (request, response, next) => {
  try {
    const vacations = await vacationsLogic.getAllVacations();

    response.json(vacations);
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

router.get("/:id",onlyAdmins, async (request, response, next) => {
  const vacationId = request.params.id;

  try {
    const vacation = await vacationsLogic.getVacationById(vacationId);

    response.json(vacation[0]);
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

router.post("/addVacation", onlyAdmins, async (request, response, next) => {
  // Extracting the JSON from the packet's BODY
  let vacationLoginData = request.body;

  try {
    await vacationsLogic.addNewVacation(vacationLoginData);
    response.json();
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

router.put("/:id", onlyAdmins, async (request, response,next) => {
  // Extracting the JSON from the packet's BODY
  let vacationData = {
    data: request.body,
    id: request.params.id,
  };
  try {
    await vacationsLogic.editVacationData(vacationData);
    response.json();
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

router.delete("/:id", onlyAdmins, async (request, response, next) => {
  // Extracting the JSON from the packet's BODY
  let id = request.params.id;

  try {
    await vacationsLogic.deleteVacation(id);
    response.json();
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

module.exports = router;
