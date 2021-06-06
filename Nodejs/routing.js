const express = require('express')

const router = express.Router()
var ObjectId = require('mongodb').ObjectID;
var isNotBought = false
var whatIsNotBought = ""
var whatIsNotBoughtList = []
var isCancel = false
var isBought = false

router.all('/', (request, response) => {
    response.redirect('/index')
})

router.get('/index', (req, response) => {
    var MongoClient = require('mongodb').MongoClient

    MongoClient.connect('mongodb://localhost:27017/', function (err, client) {
      if (err) throw err
    
      var db = client.db('myproject')
    
      db.collection('books').find().toArray(function (err, result) {
        if (err) throw err
    
        var alertText = ""
        if(isNotBought == true){
            
            response.redirect('shoppingCart')
        }
        if(isBought == true){
            alertText = "All books have been successfully bought!"
            isBought = false
            req.session.cart = []
        }
        if(isCancel == true){
            alertText = "Order canceled. the cart has been emptied!"
            isCancel = false
        }
        
        //send rendered response to index html 
        response.render('index',  { 'books': result, 'alert' : alertText })
      })
    })
})


// Access the session as req.session
router.get('/shoppingCart', (req, res) => {
    if (!req.session.cart) {
        req.session.cart = []
    }

    var alertText = ""
    if(isNotBought == true){
        alertText = "Not all products were available. Unable to buy: " + whatIsNotBought
        isNotBought = false
        whatIsNotBought = ""
        req.session.cart = whatIsNotBoughtList
        whatIsNotBoughtList = []
    }


  //send rendered response to shoppingCart html 
  res.render('shoppingCart',  { 'cart' : req.session.cart, 'alert' : alertText })
})

router.post('/add', (req, res) => {
    var book = {
        _id: req.body.bookId,
        name : req.body.bookName,
        price : req.body.bookPrice
    }
    // console.log(book)
    
    if (!req.session.cart) {
        req.session.cart = []
    }

    var isInCart = false
    req.session.cart.forEach(element => { 
        console.log(element._id)
        if(element._id == book._id){
            isInCart = true
        }
      }); 
      if(isInCart == false){
        req.session.cart.push(book)
      }
      else{
          console.log("The item is already in the cart!")
      }
    
  res.redirect('index')
})

router.post('/remove', (req, res) => {
    var book = {
        _id: req.body.bookId,
        name : req.body.bookName,
        price : req.body.bookPrice
    }
    
    var index = 0
    req.session.cart.forEach(element => { 
        // console.log(element._id)
        if(element._id == book._id){
            req.session.cart.splice(index, 1)
        }
        index++
      }); 
    res.redirect('shoppingCart')
})

router.get('/cancelCart', (req, res) => {
    req.session.cart = []
    isCancel = true
    res.redirect('index')
})

router.get('/finalizeOrder', (req, res) => {

    // console.log(req.session.cart)
    var MongoClient = require('mongodb').MongoClient

    MongoClient.connect('mongodb://localhost:27017/', function (err, client) {
        if (err) throw err
    
        var db = client.db('myproject')
    
        req.session.notBougth = []
        req.session.cart.forEach(element => { 
            // console.log('ForEach: ', element)

            db.collection("books").deleteOne({_id:ObjectId(element._id)}, function(err, obj) {
                if (err) throw err;
                console.log(obj.result.n + " document(s) deleted");
                if(obj.result.n != 1){
                    console.log("The product is unavailable: " + element.name )
                    isNotBought = true
                    whatIsNotBought += element.name + ", "
                    whatIsNotBoughtList.push(element)
                }   
            });
            
        });

        isBought = true
         req.session.cart = []
        res.redirect('index')
    })      
})

module.exports = router;