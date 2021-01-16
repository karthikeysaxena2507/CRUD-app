var DataTypes = require("sequelize").DataTypes;
var _clients = require("./clients");
var _endpoints = require("./endpoints");
var _mapping = require("./mapping");
var _mobilenumbers = require("./mobilenumbers");

function initModels(sequelize) {
  var clients = _clients(sequelize, DataTypes);
  var endpoints = _endpoints(sequelize, DataTypes);
  var mapping = _mapping(sequelize, DataTypes);
  var mobilenumbers = _mobilenumbers(sequelize, DataTypes);

  mapping.belongsTo(clients, { foreignKey: "clientid"});
  clients.hasMany(mapping, { foreignKey: "clientid"});
  mapping.belongsTo(endpoints, { foreignKey: "endpointid"});
  endpoints.hasMany(mapping, { foreignKey: "endpointid"});
  mobilenumbers.belongsTo(clients, { foreignKey: "clientid"});
  clients.hasMany(mobilenumbers, { foreignKey: "clientid"});

  return {
    clients,
    endpoints,
    mapping,
    mobilenumbers,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
