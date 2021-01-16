var DataTypes = require("sequelize").DataTypes;
var _clients = require("./clients");
var _endpoints = require("./endpoints");
var _mapping = require("./mapping");
var _mobilenumbers = require("./mobilenumbers");
var _tbl_client_endpoint_mapping = require("./tbl_client_endpoint_mapping");
var _tbl_endpoint_table = require("./tbl_endpoint_table");
var _tbl_mobile_numbers = require("./tbl_mobile_numbers");
var _tbl_whatsapp_client_config = require("./tbl_whatsapp_client_config");

function initModels(sequelize) {
  var clients = _clients(sequelize, DataTypes);
  var endpoints = _endpoints(sequelize, DataTypes);
  var mapping = _mapping(sequelize, DataTypes);
  var mobilenumbers = _mobilenumbers(sequelize, DataTypes);
  var tbl_client_endpoint_mapping = _tbl_client_endpoint_mapping(sequelize, DataTypes);
  var tbl_endpoint_table = _tbl_endpoint_table(sequelize, DataTypes);
  var tbl_mobile_numbers = _tbl_mobile_numbers(sequelize, DataTypes);
  var tbl_whatsapp_client_config = _tbl_whatsapp_client_config(sequelize, DataTypes);

  mapping.belongsTo(clients, { foreignKey: "clientid"});
  clients.hasMany(mapping, { foreignKey: "clientid"});
  mapping.belongsTo(endpoints, { foreignKey: "endpointid"});
  endpoints.hasMany(mapping, { foreignKey: "endpointid"});
  mobilenumbers.belongsTo(clients, { foreignKey: "clientid"});
  clients.hasMany(mobilenumbers, { foreignKey: "clientid"});
  tbl_client_endpoint_mapping.belongsTo(tbl_whatsapp_client_config, { foreignKey: "whatsapp_client_config_id"});
  tbl_whatsapp_client_config.hasMany(tbl_client_endpoint_mapping, { foreignKey: "whatsapp_client_config_id"});
  tbl_client_endpoint_mapping.belongsTo(tbl_endpoint_table, { foreignKey: "endpoint_table_id"});
  tbl_endpoint_table.hasMany(tbl_client_endpoint_mapping, { foreignKey: "endpoint_table_id"});
  tbl_mobile_numbers.belongsTo(tbl_whatsapp_client_config, { foreignKey: "whatsapp_client_config_id"});
  tbl_whatsapp_client_config.hasMany(tbl_mobile_numbers, { foreignKey: "whatsapp_client_config_id"});

  return {
    clients,
    endpoints,
    mapping,
    mobilenumbers,
    tbl_client_endpoint_mapping,
    tbl_endpoint_table,
    tbl_mobile_numbers,
    tbl_whatsapp_client_config,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
