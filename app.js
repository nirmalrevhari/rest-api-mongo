const express = require('express');
const app = express();
const SwaggerExpress = require('swagger-express-mw');
const mongoose = require('mongoose');


const mongoUrl = process.env.MONGO_URL || 'mongodb+srv://challengeUser:WUMglwNBaydH8Yvu@challenge-xzwqd.mongodb.net/getir-case-study?retryWrites=true';

const options = {
    reconnectTries: parseInt(process.env.MONGO_RECONN_TRIES) || 500,
    reconnectInterval: parseInt(process.env.MONGO_RECONN_TIME) || 500
};

mongoose.connect(mongoUrl, options, err => {
    if (err) {
        console.log(err);
    }
    else {
        console.log('Connected to DB');
    }
});
mongoose.connection.on('connecting', () => { console.log('MONGODB CONNECTING'); });
mongoose.connection.on('disconnected', () => { console.log('MONGODB LOST CONNECTION'); });
mongoose.connection.on('reconnect', () => { console.log('MONGODB RECONNECTED'); });
mongoose.connection.on('connected', () => { console.log('MONGODB CONNECTED'); });

app.use(express.json({ limit: '10mb' }));

module.exports = app;

var config = {
    appRoot: __dirname
};

SwaggerExpress.create(config, function (err, swaggerExpress) {
    if (err) { throw err; }
    swaggerExpress.register(app);
    var port = process.env.PORT || 5000;
    app.listen(port, (err) => {
        if (!err) {
            console.log('Server started on port ' + port);
        }
        else console.log(err);
    });
});