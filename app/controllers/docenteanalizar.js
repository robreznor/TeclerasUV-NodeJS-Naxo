var express = require('express'),
  router = express.Router(),
  auth_docente = require("../middleware/auth_docente.js"),
  queries = require('../queries/index.js');

module.exports = function (app) {
    
    var bodyParser = require('body-parser');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use('/', router);
    
    router.get('/docente/analizar/seleccionarfecha/:idasignatura/:idparalelo', auth_docente, function (request, response, next) {
        queries.analizar_docente.encontrar_preguntas(request.session.name, request.params.idparalelo, request.params.idasignatura).then(function (preguntasres) {
            console.log(preguntasres);
            var pregfechas = [];

            for (i in preguntasres) {
                var segundos;
                if (preguntasres[i].PR_HORA_INICIO.getUTCSeconds().toString().length == 1) {
                    segundos = preguntasres[i].PR_HORA_INICIO.getUTCSeconds() + "0";
                }
                else{
segundos = preguntasres[i].PR_HORA_INICIO.getUTCSeconds();
                }
                var mes = parseInt(preguntasres[i].PR_HORA_INICIO.getUTCMonth()) + 1;
                pregfechas.push({
                    fechavalue: preguntasres[i].PR_HORA_INICIO.getUTCFullYear() +"-"+mes +"-"+ preguntasres[i].PR_HORA_INICIO.getUTCDate() +" "+preguntasres[i].PR_HORA_INICIO.getUTCHours() +":"+preguntasres[i].PR_HORA_INICIO.getUTCMinutes() +":"+segundos,
                    fechainicioTotal: preguntasres[i].PR_HORA_INICIO
                })
}
console.log(pregfechas);
            response.render('docenteanalizarseleccionarfecha', {
                fechas: pregfechas, 
                idasignatura: request.params.idasignatura,
                idparalelo: request.params.idparalelo
            });
        })
        function numeroAMes(numero){
            switch (numero) {
                case 1: return "Enero";
                case 2: return "Febrero";
                case 3: return "Marzo";
                case 4: return "Abril";
                case 5: return "Mayo";
                case 6: return "Junio";
                case 7: return "Julio";
                case 8: return "Agosto";
                case 9: return "Septiembre";
                case 10: return "Octubre";
                case 11: return "Noviembre";
                case 12: return "Diciembre";
            }
            return "Error";
        }
  });

    router.get('/docente/analizar/seleccionarpregunta', auth_docente, function (request, response, next) {
        console.log(request.query);
        queries.analizar_docente.encontrar_preguntas_de_fecha(request.session.name, request.query.paralelo, request.query.asignatura, request.query.fecha).then(function (respreguntas) {
            console.log(respreguntas);
            var preguntas = [];
            for (i in respreguntas) {
                preguntas.push({
                    idpregunta: respreguntas[i].PR_ID,
                    nombre: respreguntas[i].PM_NOMBRE
                })
            }
        response.render('docenteanalizarseleccionarpregunta', {
                preguntas: preguntas,
                idasignatura: request.query.asignatura,
                idparalelo: request.query.paralelo
        });
    })
    
  });

    router.get('/docente/analizar/verrespuestas', auth_docente, function(request, response, next) {
    response.render('docenteanalizarverrespuestas', {});
  });

}
