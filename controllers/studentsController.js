var express = require('express');
var router = express.Router();

var student = require('../models/student');
var house = require('../models/house');

router.get('/', student.getAll, renderIndex);
router.get('/new', house.getAll, renderNew);
router.get('/:id', student.find, renderShow);
router.get('/:id/edit', student.find, house.getAll, selectStudentHouse, renderEdit);

router.post('/', student.create, redirectShow);
router.put('/:id', student.update, redirectShow);
router.delete('/:id', student.delete, redirectIndex);

function renderIndex(req, res){
  var mustacheVariables = {
    students: res.locals.students
  }
  res.render('./students/index', mustacheVariables);
}

function renderShow(req, res) {
  var mustacheVariables = {
    student: res.locals.student
  }
  res.render('./students/show', mustacheVariables);
}

function renderNew(req, res) {
  var mustacheVariables = {
    houses: res.locals.houses
  }
  res.render('./students/new', mustacheVariables);
}

function selectStudentHouse(req, res, next){
  res.locals.houses = res.locals.houses.map(function (house) {
    if (house.id === res.locals.student.house_id) {
      house.selected = "selected";
    } else {
      house.selected = "";
    }
    return house
  });
  next();
}

function renderEdit(req, res) {
  var mustacheVariables = {
    student: res.locals.student,
    houses: res.locals.houses
  }
  res.render('./students/edit', mustacheVariables);
}

function redirectIndex(req,res){
  res.redirect('/students');
}

function redirectShow(req, res) {
  res.redirect(`/students/${res.locals.studentId}`);
}

module.exports = router;