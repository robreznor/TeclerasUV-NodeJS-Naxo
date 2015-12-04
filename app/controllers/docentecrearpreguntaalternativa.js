var express = require('express'),
  router = express.Router(),
  auth_docente = require("../middleware/auth_docente.js"),
  queries = require('../queries/index.js'),
  path = require('path'),
  fs = require('fs'),
  multipart = require('connect-multiparty');
module.exports = function(app) {

  var bodyParser = require('body-parser');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use('/', router);

  router.get('/docente/crearpreguntaalternativa', auth_docente, function(request, response, next) {
    console.log("id usuario:",request.session.name, "tipo:", request.session.tipo);
    response.render('docentecrearpreguntaalternativa', {});
  });
  router.post("/crearpreguntaalternativa",multipart(),  auth_docente, function(request, response, next) {
    console.log(request.files);
    console.log(request.body);
    queries.gestionar_pregunta.insertar_pregunta(request.body.nombrepregunta, request.body.pregunta , request.body.url_video , request.body.explicacion)
      .then(function(insertado_pregunta) {
        
        console.log("insertado:", insertado_pregunta);
        response.redirect("/docente/crearpreguntaalternativa");
        return;
      })
      .catch(function(error) {
        console.log(error);
        /*Como ven, acá hay dos redirect, pero no se ejecutan uno y después el otro, ya que cuando entra a un callback, el flujo de ejecución cambia
         */
        //response.redirect("crearpreguntaalternativa");
        next();
      })
  })
}