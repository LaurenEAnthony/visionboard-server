const Sequelize = require("sequelize");

const sequelize = new Sequelize("visionboard", "postgres", "password", {
  host: "localhost",
  dialect: "postgres",
});

sequelize.authenticate().then(
  function () {
    console.log("Connected to visionboard postgres database!!!");
  },
  function (err) {
    console.log(err);
  }
);
module.exports = sequelize;
