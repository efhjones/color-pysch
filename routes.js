var schemeGeneratorController = require('../client/schemeGeneratorController.js');
var colorFactor = require('./colorFactory');


module.exports = function (app, express) {

  app.post('/api/traits', colorFactory.signin);

};

