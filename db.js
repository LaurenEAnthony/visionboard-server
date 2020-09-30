
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

// user.hasMany(board);
// board.belongsTo(user);
// board.hasMany(item);
// item.belongsTo(board);

///////
// const models = {
//   User: sequelize.import('/models/user.js'),
//   Board: sequelize.import('/models/board.js'),
//   Item: sequelize.import('/models/item.js')
// };

// Object.keys(models).forEach((modelName) => {
//   if ('associate' in models[modelName]) {
//     models[modelName].associate(models);
//   }
// });
// models.sequelize = sequelize;
// models.Sequelize = Sequelize;

// export default models;





sequelize.authenticate().then(

  function () {
    console.log("Connected to visionboard postgres database!!!");
  },
  function(err) {
      console.log(err);
  }
);
module.exports = sequelize;

