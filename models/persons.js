const Sequelize = require("sequelize");
const sequelize = require("../database/connection");

const Person = sequelize.define("person", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    Name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Phone: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    Address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Email: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Person;