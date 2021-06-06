const express = require('express');
const app = express();
const routing=require('./routing');

var session = require('express-session')
const parser=require('body-parser')


app.use(parser.urlencoded({extended:false}))

// ---


app.set('view engine', 'ejs');

//Information to server console
app.use((request,response,next)=>{
    console.log(`${request.method} ${request.url}: ${new Date()}`)
    next();
})

// -------------------------

var session = require('express-session')

//app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));

//-----------------------

app.use('/',routing);

app.use(express.static('public'));

app.listen(3000,()=>{
  console.log("server listening at: http://localhost:3000");
});



// --------------------------

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'myproject';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.strictEqual(null, err);
  console.log("Connection succes to server");

  const db = client.db(dbName);

  
  const books = db.collection('books');
  books.insertMany([
    { name: "Shining", price: "12$"}, 
    { name: "1984", price: "9$"}, 
    { name: "HomoDeus", price: "20$"},
    { name: "Iliada", price: "18$"},
  
    ])

  client.close();
});

// -----------------