const connection = require("./connection-wrapper");

async function addVacation(vacationData) {
 
  const {description,destination,picture,from_date,to_date,price} = vacationData;
  let sql = `INSERT INTO vacations (description,destination,picture,from_date,to_date,price)
  VALUES (?,?,?,?,?,?)`;

  try {

    let parameters = [description,destination,picture,from_date,to_date,price];
    await connection.executeWithParameters(sql, parameters);

  } catch (e){
    throw new ServerError(
      ErrorType.GENERAL_ERROR,
      JSON.stringify(vacationData),
      e
    );
  }

}

async function getVacations() {
  const sql = `SELECT * FROM vacations`;
  try {
    return await connection.execute(sql);
  } catch(e) {
    throw new ServerError(
      ErrorType.GENERAL_ERROR,
      sql,
      e
    );
  }
 
}

async function getVacationById(vacationId) {
  const sql = `SELECT * FROM vacations WHERE id=${vacationId}`;
  try {
    return await connection.execute(sql);
  } catch(e) {
    throw new ServerError(
      ErrorType.GENERAL_ERROR,
      JSON.stringify(vacationId),
      e
    );
  }
}

async function editVacationDataInDb(vacationData) {
  // console.log(vacationData, "vacation_lst");
  const {description,destination,picture,from_date,to_date,price} = vacationData.data;
  let sql = `UPDATE vacations SET description="${description}",
              destination="${destination}", picture="${picture}",
              from_date="${from_date}",to_date="${to_date}",
              price=${price} 
              WHERE id=${vacationData.id}`;

  try {
    let parameters = [description,destination,picture,from_date,to_date,price];
    await connection.executeWithParameters(sql, parameters);
  } catch(e) {
    throw new ServerError(
      ErrorType.GENERAL_ERROR,
      JSON.stringify(vacationData),
      e
    );
  }
 
}

async function deleteVacationFromDb(id) {
  const sql = `DELETE FROM vacations WHERE id=${id}`;
  try {
    return await connection.execute(sql);
  } catch (e) {
    throw new ServerError(
      ErrorType.GENERAL_ERROR,
      JSON.stringify(id),
      e
    );
  }
}

module.exports = {
  addVacation,
  getVacations,
  editVacationDataInDb,
  deleteVacationFromDb,
  getVacationById
};