'use strict';
var chai = require('chai');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);
var expect = chai.expect;
var sinon = require('sinon');
var mongoose = require('mongoose');
require('sinon-mongoose');
var rewire = require('rewire');
var exampleCtrl = rewire('./../../../src/controller/v2/function');
var exampleModel = require('./../../../src/model/example');

describe('Example', function() {
    // Global replace appLogger
    before(function (done) {
        exampleCtrl.__set__('appLogger', {
            info: function () {
            }
        });
        done();
    });

    describe('testExample', function() {
        describe('When successfully create record', function() {
            var createStub;
            var sendspy;

            before(function (done) {
                sendspy = sinon.spy();
                exampleCtrl.__set__('wsUtil.sendJson', sendspy);
                createStub = sinon.stub(mongoose.Model, 'create');
                createStub.yields(null);
                done();
            });

            it('should send mock response', function () {
                exampleCtrl.testExample({}, {});
                expect(sendspy).calledOnce;
                expect(sendspy).calledWith({}, 'function test completed. v2');
            });

            after(function (done) {
                createStub.restore();
                done();
            });
        });

        describe('When failed to create record', function() {
            var createStub;
            var nextSpy;
            var err = new Error('mock error');

            before(function (done) {
                nextSpy = sinon.spy();
                createStub = sinon.stub(mongoose.Model, 'create');
                createStub.yields(err);
                done();
            });

            it('should send error response', function () {
                exampleCtrl.testExample({}, {}, nextSpy);
                expect(nextSpy).calledOnce;
                expect(nextSpy).calledWith(err);
            });

            after(function (done) {
                createStub.restore();
                done();
            });
        });
    });
});
