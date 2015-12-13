var db = require('../models');
var sequelize = require("../models/sequelize.js");

exports.consultas = {
//TODO 
	insertar_pregunta: function(nombrepregunta, pregunta, tipo, url_video ,ruta_imagen, explicacion, paraleloid, asignaturaid, docenteid) {
    return db.TV_PREGUNTA_MAESTRA
      .build({
        PM_NOMBRE: nombrepregunta,
        PM_TEXTO: pregunta,
        PM_TIPO: tipo,
        PM_RUTA_VIDEO : url_video,
        PM_RUTA_IMAGEN : ruta_imagen,
        PM_EXPLICACION : explicacion,
        TV_PARALELO_PAR_ID: paraleloid,
        TV_PARALELO_ASI_ID: asignaturaid,
        TV_PARALELO_TV_DOCENTE_DOC_ID: docenteid
      })
      .save()
  },


  insertar_respuesta: function(respuesta, idpreguntamaestra, correcta) {
    return db.TV_RESPUESTAS
      .build({
        RES_TEXTO: respuesta,
        PM_ID: idpreguntamaestra,
        PM_CORRECTA: correcta,
      })
      .save()
  },

   buscar_preguntas_profesor: function(docid, asignaturaid, paraleloid, tipo) {
      return sequelize
      .query("select TV_PREGUNTA_MAESTRA.PM_ID as PM_ID, PM_NOMBRE, PM_TEXTO, PM_EXPLICACION, PM_TIPO,TV_PARALELO_PAR_ID, TV_PARALELO_ASI_ID, TV_PARALELO_TV_DOCENTE_DOC_ID  from TV_PREGUNTA_MAESTRA inner join TV_DOCENTE on TV_DOCENTE.DOC_ID=TV_PARALELO_TV_DOCENTE_DOC_ID where TV_PARALELO_TV_DOCENTE_DOC_ID=? and TV_PARALELO_PAR_ID=? and  TV_PARALELO_ASI_ID=? and PM_TIPO=?", {replacements: [docid, paraleloid, asignaturaid, tipo], type: sequelize.QueryTypes.SELECT} )
 
}
}
