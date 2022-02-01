const express = require("express");
const server = express();
const formidable = require("formidable");
const authenticateJwtRequestToken = require("./middleware/login-filter");
const usersController = require("./controllers/users-controller");
const adminVacationsController = require("./controllers/adminVacations-controller");
const usersVacationsController = require("./controllers/usersVacations-controller");
const errorHandler = require("./errors/error-handler");

const cors = require("cors");
server.use(cors({ origin: "http://localhost:3000" }));

server.use("/upload/", express.static(__dirname + "/upload"));

server.use(express.json());
server.use("/users", authenticateJwtRequestToken(), usersController);

server.use(
  "/vacations",
  authenticateJwtRequestToken(),
  adminVacationsController
);

server.use(
  "/userVacations",
  authenticateJwtRequestToken(),
  usersVacationsController
);

server.use(errorHandler);
// server.use(authenticateJwtRequestToken())

server.listen(3001, () => console.log("Listening on http://localhost:3001"));

server.post("/upload", async (req, res) => {
  let form = new formidable.IncomingForm();
  // console.log('new req',req)
  form.parse(req);

  form.on("fileBegin", function (name, file) {
    file.path = __dirname + "/upload/" + file.name;
  });

  form.on("file", function (name, file) {
    res.send("file successfully uploaded");
  });
  form.on("error", function (error) {
    res.send(500);
  });

  // res.sendFile(__dirname + '/index.html');
});
