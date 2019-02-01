const express = require('express');
const bodyParser = require('body-parser');
const db_connection = require('./configs/db_config');
const squel = require('squel');
const mysql = require("mysql");
const vote = require('./api/v1/vote/vote.controller');
///*apidoc -f app.js -o public/apidoc
//express_app var + port
const app = express();
const port = process.env.PORT || 3000;
//
app.listen(port);
// body JSON/url-encoded config
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//
console.log('working on port : ' + port+' !');
//
app.use('/v1/vote', vote);
