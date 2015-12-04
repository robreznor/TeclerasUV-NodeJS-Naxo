var db = require('../models');

exports.consultas = {
//TODO 
	insertar_pregunta: function(nombrepregunta, pregunta , url_video , explicacion) {
    return db.TV_PREGUNTA_MAESTRA
      .build({
        PM_NOMBRE: nombrepregunta,
        PM_TEXTO: pregunta,
        PM_RUTA_VIDEO : url_video,
        PM_EXPLICACION : explicacion
      })
      .save()
  }
}
