var pg = require('pg');
var config = {
  user: 'postgres', //env var: PGUSER
  database: 'postgres', //env var: PGDATABASE
  password: 'mysecretpassword', //env var: PGPASSWORD
  host: 'localhost', // Server hosting the postgres database
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

const client = new pg.Client(config);

client.connect();
const query = client.query(
  
  SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
  SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
  SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

  -- -----------------------------------------------------
  -- Schema OpenBike
  -- -----------------------------------------------------

  -- -----------------------------------------------------
  -- Schema OpenBike
  -- -----------------------------------------------------
  CREATE SCHEMA IF NOT EXISTS `OpenBike` DEFAULT CHARACTER SET utf8 ;
  USE `OpenBike` ;

  -- -----------------------------------------------------
  -- Table `OpenBike`.`user`
  -- -----------------------------------------------------
  CREATE TABLE IF NOT EXISTS `OpenBike`.`user` (
    `id_user` INT NOT NULL,
    `name` VARCHAR(45) NOT NULL,
    `nickname` VARCHAR(45) NOT NULL,
    `cpf` VARCHAR(11) NOT NULL,
    `adress` TEXT NULL,
    `matricula` VARCHAR(45) NULL,
    `e-mail` VARCHAR(45) NULL,
    `nascimento` DATE NULL,
    `sexo` VARCHAR(1) NULL,
    PRIMARY KEY (`id_user`))
  ENGINE = InnoDB;


  -- -----------------------------------------------------
  -- Table `OpenBike`.`station`
  -- -----------------------------------------------------
  CREATE TABLE IF NOT EXISTS `OpenBike`.`station` (
    `id_station` INT NOT NULL,
    `name` VARCHAR(45) NULL,
    `qnt_slots` INT NOT NULL,
    `adress` TEXT NOT NULL,
    `connected` TINYINT(1) NULL,
    PRIMARY KEY (`id_station`))
  ENGINE = InnoDB;


  -- -----------------------------------------------------
  -- Table `OpenBike`.`bikes`
  -- -----------------------------------------------------
  CREATE TABLE IF NOT EXISTS `OpenBike`.`bikes` (
    `id_bikes` INT NOT NULL,
    `status` VARCHAR(20) NOT NULL,
    `cont` INT NOT NULL,
    PRIMARY KEY (`id_bikes`),
    CONSTRAINT `station_bike`
      FOREIGN KEY (`id_bikes`)
      REFERENCES `OpenBike`.`station` (`id_station`)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION,
    CONSTRAINT `user_bike`
      FOREIGN KEY (`id_bikes`)
      REFERENCES `OpenBike`.`user` (`id_user`)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION)
  ENGINE = InnoDB;


  -- -----------------------------------------------------
  -- Table `OpenBike`.`emprestimo`
  -- -----------------------------------------------------
  CREATE TABLE IF NOT EXISTS `OpenBike`.`emprestimo` (
    `id_emprestimo` INT NOT NULL,
    `date` DATE NOT NULL,
    `time` TIME NOT NULL,
    `type` VARCHAR(1) NOT NULL,
    PRIMARY KEY (`id_emprestimo`),
    CONSTRAINT `emprestimo_user`
      FOREIGN KEY (`id_emprestimo`)
      REFERENCES `OpenBike`.`user` (`id_user`)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION,
    CONSTRAINT `emprestimo_station`
      FOREIGN KEY ()
      REFERENCES `OpenBike`.`station` ()
      ON DELETE NO ACTION
      ON UPDATE NO ACTION,
    CONSTRAINT `emprestimo_bike`
      FOREIGN KEY ()
      REFERENCES `OpenBike`.`bikes` ()
      ON DELETE NO ACTION
      ON UPDATE NO ACTION)
  ENGINE = InnoDB;


  SET SQL_MODE=@OLD_SQL_MODE;
  SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
  SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

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