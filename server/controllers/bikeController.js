const pg = require('pg');
const path = require('path');
var config = {
  user: 'postgres', //env var: PGUSER
  database: 'postgres', //env var: PGDATABASE
  password: 'mysecretpassword', //env var: PGPASSWORD
  host: '172.17.0.2', // Server hosting the postgres database
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};
const table_bike = bikes; //Name of table with bikes
const table_loan = loan; //Name of table with bikes

// Add Bike
exports.addBike = function(req, res, next) {
  const results = [];
  // Grab data from http request
  const data = {id_bike: req.body.id_bike, id_user: 0, status: "Works", cont: 0};
  // Get a Postgres client from the connection pool
  pg.connect(config, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Insert Data
    client.query('INSERT INTO ($1)(id_bike, id_user, status, cont) values($2, $3, $4, $5)',
    [table_bike, data.id_bike, data.id_user, data.status, data.cont]);
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM ($1) WHERE id_bike=($2) ORDER BY id ASC',[table_bike, data.id_bike]);
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
}

// Status Bike
exports.statusBike = function(req, res, next) {
  const results = [];
  const bike_id = req.params.bike_id; //Obtained through URL

  // Get a Postgres client from the connection pool
  pg.connect(config, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM ($1) WHERE id_bike=($2) ORDER BY id ASC;',[table_bike, bike_id]);
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
}

//Loan Bike
exports.loanBike = function(req, res, next) {
  const results = [];
  // Grab data from http request
  const data = {id_bike: req.body.id_bike, id_user: req.body.id_user, id_station: req.body.id_station, type: 'L'};
  // Get a Postgres client from the connection pool
  pg.connect(config, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }

    bike_cont = client.query("SELECT cont FROM ($1) WHERE id_bike=($2) ORDER BY id ASC",[table_bike, data.id_bike]);
    bike_cont++; //Cont Quantity of Loans +1

    // Update bike table
    client.query('UPDATE ($1) SET id_user=($2), cont=($3) WHERE id_bike=($4)',
    [table_bike, data.id_user, bike_cont, data.id_bike]);

    // Add a registry for this loan in the table loan
    client.query('INSERT INTO ($1)(id_bike, id_user, id_station, type) values($2, $3, $4, $5)',
    [table_loan, data.id_bike, data.id_user, data.id_station, data.type]);

    // SQL Query > Select Data
    const query = client.query("SELECT * FROM ($1) WHERE id_bike=($2) ORDER BY date DESC limit 1", [table_loan, data.id_bike]);
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });

    // After all data is returned, close connection and return results
    query.on('end', function() {
      done();
      return res.json(results);
    });
  });
}

//Devolve Bike
exports.devolveBike = function(req, res, next) {
  const results = [];
  // Grab data from http request
  const data = {id_bike: req.body.id_bike, id_station: req.body.id_station, type: 'D' , id_user: req.body.id_user};
  // Get a Postgres client from the connection pool
  pg.connect(config, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }

    // Update bike table
    client.query('UPDATE ($1) SET id_user=0 WHERE id_bike=($2)',
    [table_bike, data.id_bike]);

    //var date = new Date(); //Date of system

    // Update a registry for this loan in the table loan
    client.query('UPDATE ($1) SET devolution=SYSDATETIME() WHERE id_bike=($2)',
    [table_loan, data.id_bike]);


    // SQL Query > Select Data
    const query = client.query("SELECT * FROM ($1) WHERE id_bike=($2) ORDER BY date DESC limit 1", [table_loan, data.id_bike]);

    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });

    // After all data is returned, close connection and return results
    query.on('end', function() {
      done();
      return res.json(results);
    });
  });
}

//Registry problem with a Bike
exports.devolveBike = function(req, res, next) {
  const results = [];
  // Grab data from http request
  const data = {id_bike: req.body.id_bike, status: req.body.status};
  // Get a Postgres client from the connection pool
  pg.connect(config, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }

    // Update bike table
    client.query('UPDATE ($1) SET status=($2) WHERE id_bike=($3)',
    [table_bike, data.status, data.id_bike]);

    // SQL Query > Select Data
    const query = client.query("SELECT * FROM ($1) WHERE id_bike=($2) ORDER BY date DESC limit 1", [table_bike, data.id_bike]);

    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });

    // After all data is returned, close connection and return results
    query.on('end', function() {
      done();
      return res.json(results);
    });
  });
}