const express = require("express");
const app = express();
const port = 8000;
var cors=require('cors');
var bodyParser=require('body-parser');
var mongo = require('mongoose');
mongo.connect('mongodb://localhost:27017/student101');

var userroute = require('./routes/user');
var resourceroute = require('./routes/resource');
app.use(cors());



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//routes
app.use('/user', userroute);
app.use('/resource', resourceroute);







app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);
