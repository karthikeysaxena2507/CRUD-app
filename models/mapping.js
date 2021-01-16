const Sequelize = require("sequelize");
const sequelize = require("../database/connection");

const Mapping = sequelize.define("mapping", {
  id: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  clientid: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'clients',
      key: 'clientid'
    }
  },
  endpointid: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'endpoints',
      key: 'endpointid'
    }
  }
}, {
  sequelize,
  tableName: 'mapping',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "id" },
      ]
    },
    {
      name: "clientid",
      using: "BTREE",
      fields: [
        { name: "clientid" },
      ]
    },
    {
      name: "endpointid",
      using: "BTREE",
      fields: [
        { name: "endpointid" },
      ]
    },
  ]
});

module.exports = Mapping;