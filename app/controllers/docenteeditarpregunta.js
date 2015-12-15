var express = require('express'),
  router = express.Router(),
  auth_docente = require("../middleware/auth_docente.js"),
  queries = require('../queries/index.js');

module.exports = function(app) {

  var bodyParser = require('body-parser');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use('/', router);

  router.get('/docente/editarpregunta/:idasignatura/:idparalelo', auth_docente, function(request, response, next) {
    console.log("id usuario:",request.session.name, "tipo:", request.session.tipo);
    asignatura ={
        idasignatura: request.params.idasignatura, 
        idparalelo: request.params.idparalelo
    }
    response.render('docenteeditarpregunta', {
                      asignatura: asignatura
    })
  })
}