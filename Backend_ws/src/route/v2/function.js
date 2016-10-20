'use strict';

module.exports = function(app) {
    var module = require(app.locals.getCtrlPath('v2\\function'));
    app.get('/v2/function', module.testExample);
};
