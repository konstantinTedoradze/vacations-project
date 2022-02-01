const vacationsDao = require("../dao/adminVacations-dao");

async function addNewVacation(vacationData) {
  await vacationsDao.addVacation(vacationData);
}

async function getAllVacations() {
  return await vacationsDao.getVacations();
}

async function getVacationById(vacationId) {
  return await vacationsDao.getVacationById(vacationId);
}

async function editVacationData(vacationData) {
  await vacationsDao.editVacationDataInDb(vacationData);  
}

async function deleteVacation(id){
  await vacationsDao.deleteVacationFromDb(id);
}

module.exports = {
  addNewVacation,
  getAllVacations,
  editVacationData,
  deleteVacation,
  getVacationById
};
