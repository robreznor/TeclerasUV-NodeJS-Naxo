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

  router.get('/docente/seleccionar/fecha/:idasignatura/:idparalelo', auth_docente, function(request, response, next) {
    response.render('docenteseleccionarfecha', {});
  });

    router.get('/docente/seleccionar/pregunta', auth_docente, function(request, response, next) {
    response.render('docenteseleccionarpregunta', {});
  });

    router.get('/docente/ver/respuestas', auth_docente, function(request, response, next) {
    response.render('docenteverrespuestas', {});
  });

}
