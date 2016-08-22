'use strict';
var fs = require('fs');
var path = require('path');
var _ = require('lodash');

module.exports = function () {
    var obj = {};
    loadModels(__dirname, obj);
    return obj;
};

function loadModels(dir, obj) {
    var list = fs.readdirSync(dir);
    list.forEach(function (file) {

        if (file == 'index.js') {
            return;
        }

        var fullName = path.join(dir, file);
        var stat = fs.statSync(fullName);

        /* istanbul ignore if */
        if (stat && stat.isDirectory()) {
            loadModels(fullName, obj);
        } else if (fullName.toLowerCase().indexOf('.js') > -1) {
            loadOneModel(fullName, obj);
        }
    });
}

/* istanbul ignore next */
function loadOneModel(fullName, obj) {
    var model = require(fullName)();
    _.extend(obj, model);
}