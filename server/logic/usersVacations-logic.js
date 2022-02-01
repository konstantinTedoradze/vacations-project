const vacationsDao = require("../dao/usersVacations-dao");


async function getAllVacations(userId) {
  return await vacationsDao.getVacations(userId);
}

async function followVacation(followedVacationData) {
    await vacationsDao.addFollowedVacation(followedVacationData);
}

async function unFollowVacation(unFollowedVacationData) {
  await vacationsDao.removeFollowedVacation(unFollowedVacationData);
}

module.exports = {
  getAllVacations,
  followVacation,
  unFollowVacation
};
