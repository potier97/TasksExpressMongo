require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan'); 
var mongoose = require('mongoose');
const session = require("express-session");
const mongoDBStore = require("connect-mongodb-session")(session);
//Task Router
var taskRouter = require("./routes/index");

let store;

if (process.env.NODE_ENV === "development") {
  store = new session.MemoryStore();
} else {
  store = new mongoDBStore({
    uri: process.env.MONGO_URI,
    collection: "sessions",
  });
  store.on("error", function (error) {
    assert.ifError(error);
    assert.ok(false);
  });
}

var app = express();

app.set("secretKey", "fdvdfvdf23421jkds98nwe");
app.use(
  session({
    cookie: { maxAge: 240 * 60 * 60 * 1000 },
    store,
    saveUninitialized: true,
    resave: true,
    secret: "mongoTasks!!!_1987",
  })
);

var mongoDB = process.env.MONGO_URI
mongoose.connect(
        mongoDB, 
        { 
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useFindAndModify: false,
        });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.use(logger('dev'));  
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/', taskRouter);

module.exports = app;
