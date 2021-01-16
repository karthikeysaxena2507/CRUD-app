const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./database/connection");
const PORT = process.env.PORT || 3000;
const redis = require("redis");
const REDIS_PORT = 6379;
const redisClient = redis.createClient(REDIS_PORT);

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const apiRoutes = require("./routes/apiroutes");
app.use("/api", apiRoutes);

redisClient.on("connect", () => {
  console.log(`Redis server started on port ${REDIS_PORT}`);
});

sequelize.sync()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Express server started connected on ${PORT}`);
      });
  });