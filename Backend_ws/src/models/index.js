'use strict';
var fs = require('fs');
var path = require('path');
var _ = require('lodash');

module.exports = function(mongoose) {
    var obj = {};
    loadModels(__dirname, obj, mongoose);
    return obj;
};

function loadModels(dir, obj, mongoose) {
    var list = fs.readdirSync(dir);
    list.forEach(function(file) {

        if (file == 'index.js') {
            return;
        }

        var fullName = path.join(dir, file);
        var stat = fs.statSync(fullName);

        if (stat && stat.isDirectory()) {
            loadModels(fullName, obj, mongoose);
        } else if (fullName.toLowerCase().indexOf('.js') > -1) {
            var model = require(fullName)(mongoose);
            obj = _.extend(obj, model);
        }
    });
}
