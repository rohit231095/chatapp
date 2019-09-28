const express = require('express');
const app = express();
var cors = require('cors');
var bodyParser = require('body-parser');

app.use(cors()); // Cross-Origin 

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

const db = require('./config/db'); // Database imported
require('./config/relations'); // Models and relations imported

require('./router/routes'); // Routes imported

db.sync({ force: false })
    .then(res => {
        console.log('Database Connected');
    })
    .catch(err => {
        console.log('Connection Error --->', err);
    })

var PORT = process.env.PORT || 8080;

app.listen(PORT, ()=>console.log('App is running on port ---> ', PORT));