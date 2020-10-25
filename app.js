require("dotenv").config();
let express = require("express");
let app = express();
let sequelize = require("./db");

let user = require("./controllers/usercontroller");
let board = require("./controllers/boardcontroller");
let item = require("./controllers/itemcontroller");
let shared = require("./controllers/relationshipcontroller");

sequelize.sync();
//sequelize.sync({force: true})

app.use(express.json());

app.use(require("./middleware/headers"));

// ***UNPROTECTED ROUTES***
app.use("/api/user", user);

app.use(require("./middleware/validate-session"));
// ***PROTECTED ROUTES***
app.use("/api/board", board);
app.use("/api/item", item);
app.use("/api/shared", shared);

app.listen(process.env.PORT, function () {
  console.log(`App is listening on port ${process.env.PORT}`);
});
