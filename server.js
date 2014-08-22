var cons = require('consolidate'),
    // fs = require('fs'),
    express = require('express'),
    orm = require('orm'),
    app = express(),
    router = express.Router(),
    server = require('http').createServer(app),
    io = require('socket.io')(server),
    port = process.env.PORT || 3000;

var routes      = require('./app/controllers/routes');
var setup      = require('./config/setup');
// var reset      = require('./reset');

setup(app);
routes(app);

server.listen(port, function() {
    console.log('Server listening at port %d', port);
});

// app.engine('jade', cons.jade);

// app.set('view engine', 'jade');
// app.set('views', __dirname + '/views');

// app.use(express.static(__dirname + '/public'));

//------------------------------------------------------
// check login if needed
// router.use(function(req, res, next) {
//     //info about req method and url
//     console.log(req.method, req.url);
//     //do any testing if needed
//     next();
// });

// router.get('/', function(req, res) {
//     req.models.person.find({ surname: "Doe" }, function (err, people) {
//         console.log(people);
//     // finds people with surname='Doe' and returns sorted by name ascending
//     });
//     res.render('index');
// });


//------------------------------------------------------
// database
// var database = {
//     protocol: "mysql",
//     query: {
//         pool: true
//     },
//     host: "osplayer.com",
//     database: "kura95_korta",
//     user: "kura95_kiura",
//     password: "ku180491RA."
// }

// app.use(orm.express(database, {
//     define: function(db, models, next) {
//     models.person = db.define('person', {
//         name      : String,
//         surname   : String,
//         age       : Number,
//         male      : Boolean,
//         continent : [ 'Europe', 'America', 'Asia', 'Africa', 'Australia', 'Antartica' ], // ENUM type
//         photo     : Buffer, // BLOB/BINARY
//         data      : Object // JSON encoded
//     }, {
//         methods: {
//             fullName: function () {
//                 return this.name + ' ' + this.surname;
//             }
//         },
//         validations: {
//             age: orm.validators.rangeNumber(18, undefined, 'under-age')
//         }
//     });
//     models.person.create(
//     {
//         name: "test",
//         surname: "Doe",
//         age: 25,
//         male: true
//     }, function (err, items) {
//         // err - description of the error or null
//         // items - array of inserted items
//         // db.close();
//     });
//     db.sync();
//         // db.driver.execQuery(
//         //     "SELECT * FROM messages ",
//         //     function(err, data) {
//         //         if (err) console.log(err);
//         //         else console.log(data);
//         //     }
//         // )
//         next();
//     }
// }));




// app.use('/', router);

//------------------------------------------------------
var users = {};

io.sockets.on('connection', function(socket) {
    console.log(users);
    socket.on('setName', function(data) {
        socket.username = data;
        // if (socket.username=="kiura")
        users[data] = {
            'socket': socket,
        };

    });
    socket.on('privateMessage', function(recievedData) {
        var data = {
            'message': recievedData.message,
            'nickname': socket.username,
            'sender': recievedData.sender
        };

        users[recievedData.name].socket.emit('message', data)
    });

    socket.on('message', function(message) {
        var data = {
            'message': message,
            'nickname': socket.username
        };
        socket.broadcast.emit('message', data);
    });
});