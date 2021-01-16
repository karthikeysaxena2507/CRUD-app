const Sequelize = require("sequelize");
const sequelize = require("../database/connection");

const Endpoint = sequelize.define("endpoint", {
  endpointid: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  path: {
    type: Sequelize.STRING(255),
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'endpoints',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "endpointid" },
      ]
    },
  ]
});

module.exports = Endpoint;