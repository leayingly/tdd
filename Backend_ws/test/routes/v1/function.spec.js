'use strict';
var request = require('supertest');
var rewire = require('rewire');
var app = rewire('./../../../express');

app.__set__('appLogger', {
    info: function(){},
    error: function(){}
});

describe('Example route', function() {
    it('should be registered', function (done) {
        request(app)
            .get('/v1/function')
            .expect('Content-Type', /json/)
            .end(function(err){
                if (err) throw err;
                done();
            });
    });

    it('should return 404 on other routes', function (done) {
        request(app)
            .get('/notRegistered')
            .expect(404)
            .end(function(err){
                if (err) throw err;
                done();
            });

    });
});