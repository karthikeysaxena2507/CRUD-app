const Sequelize = require("sequelize");
const sequelize = require("../database/connection");

const Client = sequelize.define("tbl_whatsapp_client_configs", {
  id: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  app_id: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  api_key: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  issued_to: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  namespace: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  language: {
    type: Sequelize.STRING(255),
    allowNull: true
  },
  template_name: {
    type: Sequelize.STRING(255),
    allowNull: true
  },
  org_id: {
    type: Sequelize.STRING(255),
    allowNull: true
  },
  is_active: {
    type: Sequelize.TINYINT,
    allowNull: false
  }
});

module.exports = Client;