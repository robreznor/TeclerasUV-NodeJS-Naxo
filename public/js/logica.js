function goBack() {
	window.history.back()
}

function checkExt() {
	if(!document.getElementById("comprobarImagenes").value.length==0){
		if (!/.(gif|jpeg|jpg|png)$/i.test(document.getElementById("comprobarImagenes").value)){
			alert('Comprueba la extensión de tus imagenes, recuerda que los formatos aceptados son .gif, .jpeg, .jpg y .png');
			document.getElementById("comprobarImagenes").focus();
		return false;
		}
	}
}

function agregar(){
    var table = document.getElementById("tableId");
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var respuesta = prompt("Por favor, ingrese una respuesta", "");
    cell1.innerHTML = respuesta;
    cell1.setAttribute("id", "cell1")
    cell2.innerHTML='<input type="radio" name="" id="">';
    cell3.innerHTML='<input type="checkbox" name="" id="">';
}


function quitar() {
    var table = document.getElementById("tableId");
    var rowCount = table.rows.length;
	if(rowCount > 1){
		document.getElementById("tableId").deleteRow(rowCount-1);	
	}else{
		alert("Esta fila no se puede eliminar");
	}
}

function editar(){
    var respuesta = prompt("Por favor, ingrese una respuesta", "");
    document.getElementById("cell1").innerHTML = respuesta;
}

