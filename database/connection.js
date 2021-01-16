require("dotenv").config();
const Sequelize = require("sequelize");

const sequelize = new Sequelize("whatsappDB", "root", process.env.PASSWORD, {
    host: "127.0.0.1",
    dialect: "mysql",
    port: 3306,
    loggings: false,
    define: {
        timestamps: false
    }
});

sequelize.authenticate()
    .then( () => {
        console.log("connection made with Sequelize");
    })
    .catch( (err) => {
        console.log(err);
    });

module.exports = sequelize;