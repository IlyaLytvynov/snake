const { defaults } = require('jest-config');
module.exports = {
  moduleFileExtensions: [...defaults.moduleFileExtensions, '.spec.js'],
  verbose: false
};
