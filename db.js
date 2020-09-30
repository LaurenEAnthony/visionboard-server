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

// const { board, item, user, relationship } = sequelize.models;

// user.hasMany(board); OK
// board.belongsTo(user);OK
// board.hasMany(item); OK
// item.belongsTo(board); OK

// user.hasMany(relationship); OK
// relationship.belongsTo(user); OK
// relationship.hasMany(users); OK
// user.belongsTo(relationship); OK

sequelize.authenticate().then(
  function () {
    console.log("Connected to visionboard postgres database!!!");
  },
  function (err) {
    console.log(err);
  }
);
module.exports = sequelize;
