const Sequelize = require("sequelize");
const sequelize = require("../database/connection");

const Endpoint = sequelize.define("tbl_endpoint_tables", {
  id: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  path: {
    type: Sequelize.STRING(255),
    allowNull: false
  }
});

module.exports = Endpoint;