var controllers = require('./')

module.exports = function (app) {
  app.get( '/'                           , controllers.home);
  app.get( '/messages'                   , controllers.messages.list);
  // app.post('/messages'                   , controllers.messages.create);
  // app.get( '/message'                , controllers.messages.getWrong);
  app.post( '/message/:id'                , controllers.messages.get);
  app.get( '/message/create'                , controllers.messages.create);
  // app.post('/message/:messageId/comments', controllers.comments.create);
};
