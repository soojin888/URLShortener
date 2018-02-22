var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: false }));

var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/URLShortner'); // test테이블을 만든다.

const User = mongoose.model('User', { id:String, password:String, name:String, email:String, gender:String, location:String });

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/user', function (req, res) {

  var User = new User();
  User.id = req.body.id;
  User.password = req.body.password;
  User.name =  req.body.name;

  User.save(function(err){
      if(err){
          console.error(err);
          res.json({result: 0});
          return;
      }
      res.json({result: 1});
  });
});

app.get('/user/:id', function (req, res) {
  var id = req.params.id;

  User.findOne({id:id}, function(err, result){
    if(result){
      res.send(result);
      //res.redirect('/?'+result.name);
    }
    else{
      res.send('Fail');
    }
  });
});

//Read
app.post('/login', function (req, res) {
  var id = req.body.id;
  var password = req.body.password;

  User.findOne({id:id, password:password}, function(err, res){
    if(result){
      res.send('OK');
      // res.redirect('/?'+result.name);
    }
    else{
      res.send('Fail');
    }
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
