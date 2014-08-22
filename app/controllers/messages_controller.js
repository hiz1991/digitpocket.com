// var _       = require('lodash');
// var helpers = require('./_helpers');
// var orm     = require('orm');

module.exports = {
  list: function (req, res, next) {
    req.models.message.find().limit(4).order('-id').all(function (err, messages) {
      if (err) return next(err);

      var items = messages.map(function (m) {
        return m.serialize();
      });

      res.send({ items: items });
    });
  },
  create: function (req, res, next) {
    // var params = _.pick(req.body, 'title', 'body');
    var data = {title:req.param("title"), body:req.param("body")};
    console.log(data);
    req.models.message.create(data, function (err, message) {
        if (err) throw err;
        // db.close();
        return res.status(200).send(message.serialize());
    });
  },
  get: function (req, res, next) {
    // console.log(req.query.id);
    res.send(req.param("id"));

  }
};
