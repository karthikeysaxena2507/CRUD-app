const Sequelize = require("sequelize");
const sequelize = require("../database/connection");

const MobileNumber = sequelize.define("mobilenumber", {
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
  clientid: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'clients',
      key: 'clientid'
    }
  }
}, {
  sequelize,
  tableName: 'mobilenumbers',
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
      name: "clientID",
      using: "BTREE",
      fields: [
        { name: "clientid" },
      ]
    },
  ]
});

module.exports = MobileNumber;