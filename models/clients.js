const Sequelize = require("sequelize");
const sequelize = require("../database/connection");

const Client = sequelize.define("client", {
  clientid: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  appid: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  apikey: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  issuedTo: {
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
  templateName: {
    type: Sequelize.STRING(255),
    allowNull: true
  }
}, {
  sequelize,
  tableName: 'clients',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "appid" },
      ]
    },
  ]
});

// Client.sync();

module.exports = Client;