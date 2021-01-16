const Sequelize = require("sequelize");
const sequelize = require("../database/connection");

const MobileNumber = sequelize.define("tbl_mobile_numbers", {
  id: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  number: {
    type: Sequelize.STRING(20),
    allowNull: false
  },
  whatsapp_client_config_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'tbl_whatsapp_client_config',
      key: 'id'
    }
  }
});

module.exports = MobileNumber;