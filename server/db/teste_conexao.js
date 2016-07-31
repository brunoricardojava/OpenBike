var Mongoose = require('Mongoose');

var db = Mongoose.connection;

db.on('error', console.error);
db.once('open', function() {
  console.log('Conectado ao MongoDB.')
  // Vamos adicionar nossos Esquemas, Modelos e consultas aqui
});

Mongoose.connect('mongodb://localhost/teste');