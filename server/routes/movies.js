var express = require('express');
var router = express.Router();
let Movie = require("../models/movies")

/* GET users listing. */
router.get('/', function (req, res, next) {
  console.log(req.query)
  if (req.query) {
    if (req.query.genre) {
      Movie.find({ genres: { $exists: true, $all: [req.query.genre] }, type: "movie", released: { $gt: new Date("2012-01-01") }, "imdb.rating": { $gt: 8 } }).exec((err, movies) => {
        if (err) {
          res.send('error has occured');
        }
        else {
          let dummy = movies.slice(0, 50)
          res.json(dummy);
        }
      })
    }
    else if (req.query.country) {
      Movie.find({ countries: { $exists: true, $all: [req.query.country] }, type: "movie", released: { $gt: new Date("2012-01-01") }, "imdb.rating": { $gt: 8 } }).exec((err, movies) => {
        if (err) {
          res.send('error has occured');
        }
        else {
          let dummy = movies.slice(0, 50)
          res.json(dummy);
        }
      })
    }
  }
  else {
    Movie.find({ released: { $gt: new Date("2016-01-01") } }).exec((err, movies) => {
      if (err) {
        res.send('error has occured');
      }
      else {
        let dummy = movies.slice(0, 20)
        res.json(dummy);
      }
    })
  }
});

router.get('/topRated', function (req, res, next) {
  Movie.find({ "imdb.rating": { $gt: 8.5 } }).exec((err, movies) => {
    if (err) {
      res.send('error has occured');
    }
    else {
      let dummy = movies.slice(0, 17)
      res.json(dummy);
    }
  })
});

router.get('/:id', function (req, res, next) {
  console.log(req.params)
  Movie.findById(req.params.id, function(err, result) {
    if (err) {
      res.send('error has occured');
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
