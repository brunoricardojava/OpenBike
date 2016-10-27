var pg = require('pg');
var config = {
  user: 'openbike', //env var: PGUSER
  database: 'openbike', //env var: PGDATABASE
  password: 'mysecretpassword', //env var: PGPASSWORD
  host: '172.17.0.3', // Server hosting the postgres database POR ALGUM MOTIVO A PORTA DO LOCALHOST N TAVA FUNCIONANDO
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

const client = new pg.Client(config);

client.connect();

//making table for users
//query = client.query('CREATE TABLE IF NOT EXISTS users(id_user INT NOT NULL, name VARCHAR(45) NOT NULL, nickname VARCHAR(45) NOT NULL, cpf VARCHAR(11) NOT NULL, adress TEXT NULL, matricula VARCHAR(45) NULL, email VARCHAR(45) NULL, nascimento DATE NULL, sexo VARCHAR(1) NULL,  PRIMARY KEY (id_user))');
console.log("Tabela users criada com sucesso\n");

//making table for station
//query = client.query('CREATE TABLE IF NOT EXISTS stations(id_station INT NOT NULL, name VARCHAR(45) NULL, qnt_slots INT NOT NULL, adress TEXT NOT NULL, connected BIT NULL, PRIMARY KEY (id_station))');
console.log("Tabela stations criada com sucesso\n");

//making table for bikes
//query = client.query('CREATE TABLE IF NOT EXISTS bikes (id_bikes INT NOT NULL, status VARCHAR(20) NOT NULL, cont INT NOT NULL, PRIMARY KEY (id_bikes), CONSTRAINT station_bike FOREIGN KEY (id_bikes) REFERENCES stations (id_station) ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT user_bike FOREIGN KEY (id_bikes) REFERENCES users (id_user) ON DELETE NO ACTION ON UPDATE NO ACTION)');
console.log("Tabela bikes criada com sucesso\n");

//making table for loans
query = client.query('CREATE TABLE IF NOT EXISTS emprestimo (id_emprestimo INT NOT NULL, date DATE NOT NULL, time TIME NOT NULL, type VARCHAR(1) NOT NULL, PRIMARY KEY (id_emprestimo), CONSTRAINT emprestimo_user FOREIGN KEY (id_emprestimo) REFERENCES users (id_user) ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT emprestimo_station FOREIGN KEY () REFERENCES stations () ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT emprestimo_bike FOREIGN KEY () REFERENCES bikes () ON DELETE NO ACTION ON UPDATE NO ACTION)');
console.log("Tabela bikes criada com sucesso\n");

query.on('end', () => { client.end(); });