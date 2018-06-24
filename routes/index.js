var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');


/* GET home page. */



router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/product1', function(req, res) {
  res.render('product1', { title: 'product' });
});

router.get('/product2', function(req, res) {
  res.render('product2', { title: 'product' });
});

router.get('/product3', function(req, res) {
  res.render('product3', { title: 'product' });
});

router.get('/product4', function(req, res) {
  res.render('product4', { title: 'product' });
});

router.get('/product5', function(req, res) {
  res.render('product5', { title: 'product' });
});

router.get('/product6', function(req, res) {
  res.render('product6', { title: 'product' });
});

router.get('/reply', function(req, res) {
  res.render('reply', { title: 'reply' });
});









/* GET data from database. */
router.get('/thelist',function(req,res){
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/sampsite';
MongoClient.connect(url,function(err,database){

  if (err){
    console.log('unable to connect the server',err);
  }else{

    console.log("connection established!!!!!!!!");
    var db=database.db('sampsite');

    var collection = db.collection('clients');
    collection.find({}).toArray(function(err,result){
      if(err){
        res.send(err);
      
      }else if(result.length){
        res.render('clientlist',{"clientlist": result});
      }else{res.send('No documents found');}
      db.close();
    });
  
  }

})

});

/* put data to database. */
router.get('/register', function(req, res) {
  res.render('register', { title: 'Add client' });
});


router.post('/addclient',function(req,res){
  var MongoClient = mongodb.MongoClient;
  var url = 'mongodb://localhost:27017/sampsite';
  MongoClient.connect(url,function(err,database){
    if(err){
      console.log("Unable to connect to server", err);

    }else{
      console.log('Connect to server!');
      var db=database.db('sampsite');
      var collection = db.collection('clients');
      var client1 = {client: req.body.client, email:req.body.email, lecture:req.body.lecture};
      collection.insert([client1],function(err,result){
        if(err){
          console.log(err);
        }else{
          res.redirect("reply");
        }
        db.close()
      })
    }
  })
})

module.exports = router;
