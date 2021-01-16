const Sequelize = require("sequelize");
const sequelize = require("../database/connection");

const Mapping = sequelize.define("tbl_client_endpoint_mappings", {
  id: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  whatsapp_client_config_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'tbl_whatsapp_client_config',
      key: 'id'
    }
  },
  endpoint_table_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'tbl_endpoint_table',
      key: 'id'
    }
  }
});

module.exports = Mapping;