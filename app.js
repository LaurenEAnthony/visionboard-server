require('dotenv').config();
let express = require("express");
let app = express();
let sequelize = require("./db");


// let admin = require("./controllers/admincontroller");
let board = require("./controllers/boardcontroller");
let item = require("./controllers/itemcontroller");
// let shared = require("./controllers/relationshipcontroller");
let user = require("./controllers/usercontroller");


sequelize.sync();
//sequelize.sync({force: true})

app.use(express.json());
app.use(require('./middleware/headers'));

app.use("/api/user", user);
// app.use("/api/admin", admin);
app.use(require("./middleware/validate-session"));
app.use("/api/board", board);
app.use("/api/item", item);
// app.use("/api/shared", shared);


app.listen(3000, function () {
  console.log("App is listening on port 3000");
});
