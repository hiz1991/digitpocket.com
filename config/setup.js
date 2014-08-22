var path     = require('path');
var express  = require('express');
var settings = require('./settings');
var models   = require('../app/models/');
var cons = require('consolidate');
module.exports = function (app) {
    var router = express.Router();
    
    app.use(express.static(path.join(settings.path, 'public')));
    app.engine('jade', cons.jade);
    app.set('view engine', 'jade');
    app.set('views', __dirname + '/views');

    app.use(function (req, res, next) {
      models(function (err, db) {
        if (err) return next(err);

        req.models = db.models;
        req.db     = db;

        return next();
      });
    }),
    app.use(router);
    // app.use('/', router);
};
