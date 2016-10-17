var pg = require('pg');
var config = {
  user: 'postgres', //env var: PGUSER
  database: 'postgres', //env var: PGDATABASE
  password: 'mysecretpassword', //env var: PGPASSWORD
  host: '172.17.0.3', // Server hosting the postgres database
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

const client = new pg.Client(config);

client.connect();
const query = client.query(
  'CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');
query.on('end', () => { client.end(); });


/*var query = client.query(
  'CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');
//client.connect();
client.connect(function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
  // client.query('SELECT $1::int AS number', ['1'], function(err, result) {
  //   //call `done()` to release the client back to the pool
  //   done();

  //   if(err) {
  //     return console.error('error running query', err);
  //   }
  //   console.log(result.rows[0].number);
  //   //output: 1
  // });
  query.on('end', () => { client.end(); });

});*/