// con esto se desactiva el boton derecho del raton
document.oncontextmenu = function(){return false;};

//aciertos y equivocaciones
var aciertos=0;
var fallos=0;

//variable para comprobar si ya han respondido al test
var booltest=false;

// var para el resultado en texto se le puede poner lo que se quiera para que salga en el div de respuesta al final del todo.   El atributo texto,si no se necesita se puede qutar el string que va y dejarlo solo con '', asi no saldrá nada
var resultado={
	'titulo':'Resultados del test', 
	'subtitulo': 'El resultado de su test ha sido: ', 
	'porcentaje': '', 
	'nota':'', 
	'texto':'aqui va el texto, si no se necesita, se puede quitar sin problema'
}
//variable que almacena el div en el que se mostrará el resultado
var divRespuestaVar = document.getElementById('resultado');

//array preguntas, respuestas y formularios(los de las preguntas)
var preguntas=[];
var respuestas=[];
var formularios= document.forms;

// Boton enviar
var enviar= document.getElementById('boton');
enviar.addEventListener('click', enviarFormulario,false);


/**************************************

funciones

************************************/
//asignar las respuestas obtenidas al array respuestas
function rellenarespuestas(){
	
	for(i=0 ; i< formularios.length ; i++){
		respuestas[i].a=document.forms[i].querySelectorAll("input[type=checkbox]")[0].checked;
		respuestas[i].b=document.forms[i].querySelectorAll("input[type=checkbox]")[1].checked;
		respuestas[i].c=document.forms[i].querySelectorAll("input[type=checkbox]")[2].checked;
		respuestas[i].d=document.forms[i].querySelectorAll("input[type=checkbox]")[3].checked;
		respuestas[i].e=document.forms[i].querySelectorAll("input[type=checkbox]")[4].checked;
		
	}
}

// asignar las opciones buenas a las preguntas
function rellenapreguntas(){
	preguntas[0].a=true;
	preguntas[1].a=true;
	preguntas[1].b=true;
	preguntas[2].c=true;
	preguntas[3].d=true;
	preguntas[4].e=true;
	preguntas[5].a=true;
	preguntas[6].b=true;
	preguntas[7].c=true;
	preguntas[8].d=true;
	preguntas[9].e=true;
	preguntas[10].a=true;

}

//pobla los arrays todo con false
function poblarArrays(){
var longitud=document.forms.length;
	for(i=0 ; i < longitud ; i++){
		preguntas.push({
			'a' :false,
			'b' :false,
			'c' :false,
			'd' :false,
			'e' :false
		});
		respuestas.push({
			'a' :false,
			'b' :false,
			'c' :false,
			'd' :false,
			'e' :false
		});
	}
}


//comparar una pregunta con una respuesta, si se ha respondido correctamente se añade un acierto a la var global y si se ha respondido algo pero mal añade uno a la val fallos, ademas por si hubiera hecho falta devuelve true si hay acierto y false si hay fallo
function comparar(preg,resp){
	var retorno;
	if( ((resp.a==preg.a) && (resp.b==preg.b) && (resp.c==preg.c) && (resp.d==preg.d) && (resp.e==preg.e)) && ((resp.a==true) || (resp.b==true) || (resp.c==true) || (resp.d==true) || (resp.e==true)) ){
		aciertos++;
		retorno=true;
	}
	else if( ((resp.a==true) || (resp.b==true) || (resp.c==true) || (resp.d==true) || (resp.e==true))  &&  ((resp.a==preg.a) || (resp.b==preg.b) || (resp.c==preg.c) || (resp.d==preg.d) || (resp.e==preg.e))){
		fallos++;
		retorno=false;
	}

	
	return retorno;
}

// comprueba que no se haya contestado el test ya y si no es asi, compara las preguntas con las respuestas, ademas, quita el evento al boton, para que no se pueda volver a enviar
function comprobarRespuestas(){

	if(!booltest){
	rellenarespuestas();	
	for(i= 0 ; i< formularios.length ; i++){
		comparar(preguntas[i], respuestas[i]);
	}
	booltest=true; // con esto se desactiva la posibilidad de volver a hacer el test, solo se podrá si se recarga la pagina
	enviar.removeEventListener('click',enviarFormulario,false);
	}else{
		alert("Usted ya ha contestado al test");
	}
}

//establece la puntuacion del test y al div de la respuesta le dirá la nota con la que aparecerá dependiendo del porcentaje de acierto
function puntuacion(){
	var x =( ((aciertos - (fallos/2))*100) / formularios.length).toFixed(2);
	
	switch(true){
		case (x<50):
		resultado.nota="Suspenso";
		break;
		case (x >= 50 && x<60):
		resultado.nota="Aprobado";
		break;
		case (x >= 60 && x<70):
		resultado.nota="Bien";
		break;
		case (x >= 70 && x<90):
		resultado.nota="Notable";
		break;
		case (x >= 90 && x<100):
		resultado.nota="Sobresaliente";
		break;
		case (x==100):
		resultado.nota="Matricula de Honor";
		break;
		default:
		x="00";
		resultado.nota='"Disculple, ha habido un error"';
		console.log("esta pasando por default del switch de puntuacion");
	}
	resultado.porcentaje= x.toString();
}

//llenar y hacer aparecer el div cpn el resultado del test
function divRespuesta(){
divRespuestaVar.innerHTML='<h1>' + resultado.titulo + '</h1>' +
'<p> ' +resultado.subtitulo  + resultado.porcentaje + '%</p>'+'<p> ' + 
'Su nota es: '+ resultado.nota +'</p>'+'<p> ' + resultado.texto +'</p>'   ; 

$(document).ready(function(){

     $(window).resize(function(){
 
          // aquí le pasamos la clase o id de nuestro div a centrar (en este caso "caja")
          $('.resultado').css({
               position:'absolute',
               left: ($(window).width() - $('.resultado').outerWidth())/2,
               top: ($(window).height() - $('.resultado').outerHeight())/2
          });
       
    });
$(document).ready(function() {
	$('.resultado').fadeIn(1000);
	$('.sombra').fadeIn(1000);
});
// Ejecutamos la función
$(window).resize();
 
});
}

//funcion para enviar el formulario (funcionara cuando click en boton enviar)
function enviarFormulario(){
comprobarRespuestas();
puntuacion();
divRespuesta();	
}


//añadimos evento load a window y ejecutamos funcion init()
window.addEventListener('load',init, false);

//funcion init que se ejecutará cuando se carge el html
function init(){
poblarArrays();
rellenapreguntas();
}
