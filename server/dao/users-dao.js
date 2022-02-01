const connection = require("./connection-wrapper");
let ErrorType = require("./../errors/error-type");
let ServerError = require("./../errors/server-error");

async function registrateUser(registrationData) {
  let sql = `INSERT INTO Users (username,password,first_name,last_name)
  VALUES (?,?,?,?)`;

  let parameters = [
    registrationData.userName,
    registrationData.password,
    registrationData.firstName,
    registrationData.lastName,
  ];
  try {
    const registered = await connection.executeWithParameters(sql, parameters);
    return registered.insertId;
    // console.log(registered,'blklululu')
  } catch (e) {
    throw new ServerError(
      ErrorType.GENERAL_ERROR,
      JSON.stringify(registrationData),
      e
    );
  }
}

async function checkUserRegistered(registrationData) {
  const sql = `SELECT * FROM users`;
  const users = await connection.execute(sql);
  const user = users.find((u) => u.username === registrationData.userName);
  return user;
}

async function checkLogIn(loginData) {
  const sql = `SELECT id, user_type, first_name FROM users WHERE 
  username='${loginData.userName}' AND password='${loginData.password}'`;
  try {
    const foundUser = await connection.execute(sql);
    return foundUser;
  } catch (e) {
    throw new ServerError(
      ErrorType.GENERAL_ERROR,
      JSON.stringify(loginData),
      e
    );
  }
}

async function isUserExist(registrationData) {
  // check if user exist in DB
  const sql = `SELECT * FROM myvacations.users where username='${registrationData.userName}'`;
  try {
    const existingUser = await connection.execute(sql);
    return existingUser.length !== 0 ? true : false;
  } catch (e) {
    throw new ServerError(
      ErrorType.GENERAL_ERROR,
      JSON.stringify(registrationData),
      e
    );
  }
}

async function getUser(userId) {
  const sql = `SELECT username, first_name, last_name FROM users WHERE id = ${userId}`;

  try {
    const user = await connection.execute(sql);
    return user;
  } catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(userId), e);
  }
}
async function getUserPassword(userId) {
  const sql = `SELECT password FROM users WHERE id = ${userId}`;

  try {
    const user = await connection.execute(sql);
    return user;
  } catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(userId), e);
  }
}
async function updateUser(userData) {
  try {
    const sql = `UPDATE users
  SET username=?, first_name=?, last_name=?
  WHERE id=${userData.userId}`;
    const { username, first_name, last_name } = userData.userDetails;
    let parameters = [username, first_name, last_name];
    const updated = await connection.executeWithParameters(sql, parameters);
    return updated.affectedRows
    // console.log(updated.affectedRows, "updated");
  } catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
  }
}
async function deleteUser(userId) {
  try {
    const sql = `Delete FROM users
    WHERE id=${userId}`;
    const deleted = await connection.execute(sql);
    return deleted.affectedRows
    // console.log(deleted, "deleted");
  } catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
  }
}

module.exports = {
  registrateUser,
  checkUserRegistered,
  checkLogIn,
  isUserExist,
  getUser,
  getUserPassword,
  updateUser,
  deleteUser
};
