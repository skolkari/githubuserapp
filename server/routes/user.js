var express = require("express");
var request = require("request");
var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  next();
});

// define get user details route
router.get("/details/:userId", function(req, res) {
  let options = {
    url: 'https://api.github.com/users/' + req.params.userId,
    headers: {
      'User-Agent': 'request'
    }
  };
  
  request.get(options , (error, response, body) => {
    if (error) {
      res.send(error);
    }
    res.send(body);
  });
});

// define get user details route
router.get("/following/:userId/:fetchCount", function(req, res) {
  let options = {
    url: 'https://api.github.com/users/' + req.params.userId + '/following',
    headers: {
      'User-Agent': 'request'
    }
  };
  
  request.get(options , (error, response, body) => {
    if (error) {
      res.send(error);
    }
    let repos = [];
    repos = JSON.parse(body);
    repos = repos.splice(0, req.params.fetchCount);
    res.send(repos);
  });
});

// define get user details route
router.get("/repos/:userId", function(req, res) {
  let options = {
    url: 'https://api.github.com/users/' + req.params.userId + '/repos',
    headers: {
      'User-Agent': 'request'
    }
  };
  
  request.get(options , (error, response, body) => {
    if (error) {
      res.send(error);
    }
    res.send(body);
  });
});

module.exports = router;
