'use strict';

module.exports = function(app) {
    var module = require(app.locals.getCtrlPath('v1\\function'));
    app.get('/v1/function', module.testExample);
};
