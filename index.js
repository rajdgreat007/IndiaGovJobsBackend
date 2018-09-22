var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//mongoose.connect("mongodb://localhost:27017/indiagovjobs");
mongoose.connect(process.env.MONGODB_URI);
var deviceDetailsSchema = new mongoose.Schema({
    osType: String,
    deviceToken: String
});

var Device = mongoose.model("Device", deviceDetailsSchema);

app.get('/', (req, res) => {
    res.send('server is up!');
});

app.post('/addDevice', (req, res) => {
    var device = new Device(req.body);
    device.save()
        .then(item => {
            res.send("device saved to database");
        })
        .catch(err => {
            res.status(400).send("unable to save device to database");
        });
});

app.listen(port, () => {
    console.log('server listening on port : ' + port);
});