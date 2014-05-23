window.onload = function (){ // decimos al script que no empieze hasta que el window este cargado

	// creamos la funcion
	function x(){
		alert("funcionx");
		return false; //anula el comportamiento del elemento <a>
	}


	var el = document.getElementById('boton'); // reducimos de escribir siempre el document.getElementById('boton');, esto viene bien si tenemos que hacer referencia varias veces al ID que utilizemos en las funciones.

	//hacemos referencia al id que queremos asociar el evento click
	el.onclick = function() {
		x(); // ahora la funcion solo se ejecutara cuando dispare el evento
	}
	//el onclick desde un script se declara diferente del onclick que va inline en la etiqueta html

} //end window.onload
