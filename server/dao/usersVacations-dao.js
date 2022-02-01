const connection = require("./connection-wrapper");

async function getVacations(userId) {
  const sql1 = `SELECT vacations.id, vacations.description, vacations.destination, vacations.picture, 
                vacations.from_date, vacations.to_date, vacations.price,vacations.followers, followed_vacations.status
            FROM vacations
            LEFT JOIN followed_vacations ON vacations.id = followed_vacations.vacation_id
            where user_id=${userId}`;

  try {
    let followedVacations = await connection.execute(sql1);
    let arrayOfIds = [];
    let stringOfIds;
    if (followedVacations.length) {
      followedVacations.forEach((vacation) => {
        arrayOfIds.push(vacation.id);
      });
      stringOfIds = arrayOfIds.toString();
    } else {
      stringOfIds = 0;
    }
  
    const sql2 = `SELECT * FROM vacations WHERE id  NOT IN (${stringOfIds});`;
    let restOfVacations = await connection.execute(sql2);
    return [...followedVacations, ...restOfVacations];
  } catch(e) {
    throw new ServerError(
      ErrorType.GENERAL_ERROR,
      JSON.stringify(userId),
      e
    );
  }

}

async function addFollowedVacation(followedVacationData) {
  const { userId, vacationId } = followedVacationData;
  let sql1 = `INSERT INTO followed_vacations (user_id,vacation_id)
    VALUES (?,?);`;
    try {
      let parameters1 = [userId, vacationId];
      await connection.executeWithParameters(sql1, parameters1);
    
      let sql2 = `UPDATE vacations
        SET followers=followers + 1
        WHERE id=?;`;
      let parameters2 = [vacationId];
      await connection.executeWithParameters(sql2, parameters2);

    } catch (e) {
      throw new ServerError(
        ErrorType.GENERAL_ERROR,
        JSON.stringify(followedVacationData),
        e
      );
    }
 
}

async function removeFollowedVacation(unFollowedVacationData) {
  const { userId, vacationId } = unFollowedVacationData;
  let sql1 = `DELETE FROM followed_vacations WHERE user_id=? AND vacation_id=?`;

  try {
    let parameters1 = [userId, vacationId];
  await connection.executeWithParameters(sql1, parameters1);

  let sql2 = `UPDATE vacations
    SET followers=followers - 1
    WHERE id=? AND  followers >= 1;`;
  let parameters2 = [vacationId];
  await connection.executeWithParameters(sql2, parameters2);
  } catch (e) {
    throw new ServerError(
      ErrorType.GENERAL_ERROR,
      JSON.stringify(unFollowedVacationData),
      e
    );
  }
  
}


module.exports = {
  getVacations,
  addFollowedVacation,
  removeFollowedVacation,
};
