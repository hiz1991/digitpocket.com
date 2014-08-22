var settings = require('../../config/settings');

module.exports = function (req, res, next) {
    req.models.message.find(function (err, msg) {
        console.log(msg[0].title);
    // finds people with surname='Doe' and returns sorted by name ascending
    });
    res.render(settings.path + '/views/index');
};
