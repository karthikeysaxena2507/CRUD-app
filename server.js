const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./database/connection");
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const peopleRoutes = require("./routes/personRoutes");
app.use("/persons", peopleRoutes);

sequelize.sync()
    .then(() => {
      app.listen(PORT, () => {
        console.log("server ready");
      });
  });