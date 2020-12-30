var DataTypes = require("sequelize").DataTypes;
var _people = require("./people");

function initModels(sequelize) {
  var people = _people(sequelize, DataTypes);


  return {
    people,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
