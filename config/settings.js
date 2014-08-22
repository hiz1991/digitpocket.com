var path       = require('path');

var settings = {
  path       : path.normalize(path.join(__dirname, '..')),
  port       : process.env.NODE_PORT || 3000,
  database   : {
    protocol: "mysql",
    query: {
        pool: true
    },
    host: "osplayer.com",
    database: "kura95_korta",
    user: "kura95_kiura",
    password: "ku180491RA."
  }
};

module.exports = settings;
