const express = require('express');
const router = express.Router();
const pg = require('pg');
const path = require('path');
const bikeController = require('../controllers/bikeController');
var config = {
  user: 'postgres', //env var: PGUSER
  database: 'postgres', //env var: PGDATABASE
  password: 'mysecretpassword', //env var: PGPASSWORD
  host: '172.17.0.2', // Server hosting the postgres database
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//Add User
router.post('/api/v1/todos', bikeController.addBike);
//Read BD
router.get('/api/v1/todos', bikeController.readBike);

//Update data
router.put('/api/v1/todos/:todo_id', bikeController.updateBike);

//Delete data
router.delete('/api/v1/todos/:todo_id', bikeController.deleteBike);


module.exports = router;
