var db = require('../db/config');
var student = {};

student.getAll = function(req, res, next){
  db.manyOrNone('SELECT * FROM students;')
    .then(function(result){
      res.locals.students = result;
      next();
    })
    .catch(function(error){
      console.log(error);
      next();
    })
}

student.find = function (req, res, next) {
  db.one('SELECT * FROM students WHERE id = $1;', [req.params.id])
    .then(function (result) {
      res.locals.student = result;
      next();
    })
    .catch(function (error) {
      console.log(error);
      next();
    })
}

student.create = function (req, res, next) {
  db.one('INSERT INTO students(fname, lname, image, house_id) VALUES ($1,$2,$3,$4) RETURNING id;',
        [req.body.fname, req.body.lname, req.body.image, req.body.house_id])
    .then(function (result) {
      res.locals.studentId = result.id;
      next();
    })
    .catch(function (error) {
      console.log(error);
      next();
    })
}

student.update = function (req, res, next) {
  db.one('UPDATE students SET fname=$1, lname=$2, image=$3, house_id=$4 WHERE id=$5 RETURNING id;'
        [req.body.fname, req.body.lname, req.body.image, req.body.house_id, req.params.id])
    .then(function (result) {
      res.locals.studentId = result.id;
      next();
    })
    .catch(function (error) {
      console.log(error);
      next();
    })
}

student.delete = function (req, res, next) {
  db.none('DELETE FROM students WHERE id=$1;', [req.params.id])
    .then(function () {
      next();
    })
    .catch(function (error) {
      console.log(error);
      next();
    })
}

student.findByHouse = function (req, res, next) {
  db.manyOrNone("SELECT * FROM students WHERE house_id=$1;", [req.params.id])
    .then(function (result) {
      res.locals.students = result;
      next();
    })
    .catch(function (error) {
      console.log(error);
      next();
    })
}

module.exports = student;