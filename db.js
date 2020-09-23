const Sequelize = require("sequelize");
// const Board = require("./models/board");
// const Item = require("./models/item");
// const User = require("./models/user");
// const Relationship = require("./models/relationship");

const sequelize = new Sequelize("visionboard", "postgres", "password", {
  host: "localhost",
  dialect: "postgres",
});

// Board(sequelize);
// Item(sequelize);
// User(sequelize);
// Relationship(sequelize);

// const {board, item, user, relationship} = sequelize.models

// user.hasMany(relationship)
// relationship.belongsTo(user)

sequelize.authenticate().then(
  function () {
    console.log("Connected to visionboard postgres database");
  },
  function (err) {
    console.log(err);
  }
);
module.exports = sequelize;
