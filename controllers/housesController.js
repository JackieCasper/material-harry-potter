var express = require('express');
var router = express.Router();

var house = require('../models/house');
var student = require('../models/student');

router.get('/', house.getAll, renderIndex);
router.get('/:id', house.find, student.findByHouse, renderShow);

function renderIndex(req, res){
  var mustacheVariables = {
    houses: res.locals.houses
  }
  res.render('./houses/index', mustacheVariables);
}

function renderShow(req,res){
  var mustacheVariables = {
    house: res.locals.house,
    students: res.locals.students
  }
  res.render('./houses/show', mustacheVariables);
}

module.exports = router;