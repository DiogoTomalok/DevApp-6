const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'Projeto',
  location: 'southamerica-east1'
};
exports.connectorConfig = connectorConfig;

