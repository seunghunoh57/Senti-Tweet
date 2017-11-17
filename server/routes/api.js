const express = require('express');
const router = express.Router();
const config = require('../config/config');
var User = require('../models/Users');

const Twit = require('twit');
const indico = require('indico.io');

const T = new Twit(config.oauth)
indico.apiKey = config.indico.apiKey

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

router.get('/me', (req, res) => {
    console.log("====================== API CALL =========================")
    console.log("me api");
    console.log(req.user);
    res.json(req.user);
  });
  
router.post('/search', (req, res) => {
  T.get('users/search', { q: JSON.stringify(req.body.searchBar), count: 1 })
  .then(function(result) {
      console.log(result);
      res.json(result.data);
      // res.send(result.data)
  })
  .catch(function (err){
    console.log("FOUND ERROR: " + err.message)
  })
})  

router.post('/sentiment', (req,res) => {
  // console.log(JSON.prase(req.body))
  indico.emotion(JSON.stringify(req.body.sentimentBar))
  .then(function(result){
    console.log(result);
    res.json(result)
  })
  .catch(function(err){
    console.log(err.message)
  });
})

router.post('/create', (req,res) => {
      // grab the user model

    // create a new user
    var newUser = User({
      email: 'starlord55',
      password: 'password'
    });

    // save the user
    newUser.save(function(err) {
      if (err) throw err;

      console.log('User created!');
    });
})

module.exports = router;
