'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//mongoose.connect('mongodb://localhost/myapp'); //Conectar ao BD para carregas os Schemas

var BikeSchema = new Schema({
  id_bike: Number,
  id_user: {type: Schema.Types.ObjectId, ref: 'User'},
  bug: String,
  cont_loan: Number
});

exports.Bike = mongoose.model('Bike', BikeSchema);


var UserSchema = new Schema({
  id: {type: Number, required: true},
  name: { type: String, required: true},
  user: { type: String, required: true, unique: true },
  password: { type: String, required: true},
  cpf: { type: Number, required: true, unique: true },
  school_number: Number,
  email: { type: String, required: true, unique: true },
  id_bike: { type: Schema.Types.ObjectId, ref: "Bike" },
  date_birth: Number,
  sex: String,
  adress: String
});

exports.User = mongoose.model('User', UserSchema);


var StationSchema = new Schema({
  name: { type: String, required: true, unique: true },
  quant_slots: Number,
  adress: String,
  localization: Number,
  slots: {
    slot_1: { type: Schema.Types.ObjectId, ref: "Bike" },
    slot_2: { type: Schema.Types.ObjectId, ref: "Bike" },
    slot_3: { type: Schema.Types.ObjectId, ref: "Bike" },
    slot_4: { type: Schema.Types.ObjectId, ref: "Bike" },
    slot_5: { type: Schema.Types.ObjectId, ref: "Bike" },
    slot_6: { type: Schema.Types.ObjectId, ref: "Bike" },
    slot_7: { type: Schema.Types.ObjectId, ref: "Bike" },
    slot_8: { type: Schema.Types.ObjectId, ref: "Bike" },
    slot_9: { type: Schema.Types.ObjectId, ref: "Bike" },
    slot_10: { type: Schema.Types.ObjectId, ref: "Bike" },
  },
  internet_connection: Boolean,
  active: Boolean
});

exports.Station = mongoose.model('Station', StationSchema);


var LoanSchema = new Schema({
  id_bike: {type: Schema.Types.ObjectId, ref: "Bike"},
  id_usuário: {type: Schema.Types.ObjectId, ref: "User"},
  id_station: {type: Schema.Types.ObjectId, ref: "Station"},
  date: {type : Date, default: Date.now()},
  type: String //Loan or Devolution
});

exports.Loan = mongoose.model("Loan", LoanSchema);