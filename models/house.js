var db = require('../db/config');

var house = {};

house.getAll = function(req, res, next){
  db.manyOrNone("SELECT * FROM houses;")
    .then(function(result){
      res.locals.houses = result;
      next()
    })
    .catch(function(error){
      console.log(error);
      next()
    })
}

house.find = function (req, res, next) {
  db.one("SELECT * FROM houses WHERE id=$1;", [req.params.id])
    .then(function (result) {
      res.locals.house = result;
      next();
    })
    .catch(function (error) {
      console.log(error);
      next();
    })
}

module.exports = house;