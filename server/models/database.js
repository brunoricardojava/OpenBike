var pg = require('pg');
var config = {
  user: 'openbike', //env var: PGUSER
  database: 'openbike', //env var: PGDATABASE
  password: 'mysecretpassword', //env var: PGPASSWORD
  host: '172.17.0.2', // Server hosting the postgres database POR ALGUM MOTIVO A PORTA DO LOCALHOST N TAVA FUNCIONANDO
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

var createTableUsers = function() {
  const client = new pg.Client(config);

  //making table for users
  client.connect();
  query = client.query('CREATE TABLE IF NOT EXISTS users(id_user INT NOT NULL, name VARCHAR(45) NOT NULL, nickname VARCHAR(45) NOT NULL, cpf VARCHAR(11) NOT NULL, adress TEXT NULL, matricula VARCHAR(45) NULL, email VARCHAR(45) NULL, nascimento DATE NULL, sexo VARCHAR(1) NULL,  PRIMARY KEY (id_user))');
  query.on('end', () => { client.end(); console.log("Tabela users criada com sucesso\n");});
};

var createTableBikes = function() {
  const client = new pg.Client(config);

  //making table for bikes
  client.connect();
  query = client.query('CREATE TABLE IF NOT EXISTS bikes(id_bike INT NOT NULL, status VARCHAR(20) NOT NULL, cont INT NOT NULL, PRIMARY KEY (id_bike), CONSTRAINT station_bike FOREIGN KEY (id_bike) REFERENCES stations (id_station) ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT user_bike FOREIGN KEY (id_bike) REFERENCES users (id_user) ON DELETE NO ACTION ON UPDATE NO ACTION)');
  query.on('end', () => { client.end(); console.log("Tabela bikes criada com sucesso\n");});
};

var createTableStations = function() {
  const client = new pg.Client(config);

  //making table for station
  client.connect();
  query = client.query('CREATE TABLE IF NOT EXISTS stations(id_station INT NOT NULL, name VARCHAR(45) NULL, qnt_slots INT NOT NULL, adress TEXT NOT NULL, connected BIT NULL, PRIMARY KEY (id_station))');
  query.on('end', () => { client.end(); console.log("Tabela stations criada com sucesso\n"); });
};

var createTableLoans = function() {
  const client = new pg.Client(config);

  //making table for loans
  client.connect();
  query = client.query('CREATE TABLE IF NOT EXISTS loans(id_loan INT NOT NULL, date DATE NOT NULL, time TIME NOT NULL, type VARCHAR(1) NOT NULL, PRIMARY KEY (id_loan), CONSTRAINT loan_user FOREIGN KEY (id_loan) REFERENCES users (id_user) ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT loan_station FOREIGN KEY (id_loan) REFERENCES stations (id_station) ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT loan_bike FOREIGN KEY (id_loan) REFERENCES bikes (id_bike) ON DELETE NO ACTION ON UPDATE NO ACTION)');
  query.on('end', () => { client.end(); console.log("Tabela emprestimo criada com sucesso\n");});
};
createTableUsers();
createTableStations();
createTableBikes();
createTableLoans();