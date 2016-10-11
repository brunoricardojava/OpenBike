

'use strict';

var mongoose = require('mongoose'),
    User = require('mongoose').model('User')

exports.createUser = function (req, res) {
  var Ufields = {
    id : req.body.id,
    name : req.body.name,
    user : req.body.user,
    password : req.body.password,
    cpf : req.body.cpf,
    school_number : req.body.school_number,
    email : req.body.email,
    id_bike : req.body.id_bike,
    date_birth : req.body.date_birth,
    sex : req.body.sex,
    adress : req.body.adress
  }

  console.log(req.name);

  Ufields = new User(Ufields);
  Ufields.save(function(err){
    console.log(Ufields.name);

    if( (err) || (Ufields.user.length===0) ) {
      return res.send(400);
      console.log("Erro ao cadastrar usuário");
    }
    else {
      res.json(Ufields);
      console.log("Usuário Cadastrado");
    }
  });
}



exports.listProjects = function (req, res) {
  Project.find({}, function (err, result) {
    if (err) {
      return res.send(500);
    } else {
      res.json(result);
    }
  });
};

exports.createCommentInATask = function (req, res) {
  var comment = new Comment(req.body);
  comment.task = req.task.toJSON();
  comment.project = req.project.toJSON();
  comment.user = req.user;

  comment.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(comment);
    }
  });
};


/**
 * Task middleware
 */
exports.taskByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Task is invalid'
    });
  }

  Task.findById(id).exec(function (err, task) {
    if (err) {
      return next(err);
    } else if (!task) {
      return res.status(404).send({
        message: 'No task with that identifier has been found'
      });
    }
    req.task = task;
    next();
  });
};

/**
 * Project middleware
 */
exports.projectByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Project is invalid'
    });
  }

  Project.findById(id).exec(function (err, project) {
    if (err) {
      return next(err);
    } else if (!project) {
      return res.status(404).send({
        message: 'No project with that identifier has been found'
      });
    }
    req.project = project;
    next();
  });
};

exports.deleteProjects = function(req, res){

  var Project_id = req.body.id//

    Project.remove({ _id: Project_id }, function(err) {
      if(!err){
       console.log("OK_delete");
        return res.send("OK_delete");
      }
      else{
        console.log("Error");
        return res.send(500);
      }});
};

//  console.log("Listing Projects");
//  res.json({Hello: 'World'});
//};

