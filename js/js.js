
//aciertos y equivocaciones
var aciertos=0;
var fallos=0;

//variable para comprobar si ya han respondido al test
var booltest=false;

// var para el resultado
var resultado={
	'titulo':'Resultados del test', 
	'subtitulo': 'El resultado de su test ha sido: ', 
	'porcentaje': '', 
	'texto':'Gracias'
}
var divRespuestaVar = document.getElementById('resultado');
//array preguntas, respuestas y formularios(los de las preguntas)
var preguntas=[];
var respuestas=[];
var formularios= document.forms;

// Boton enviar
var enviar= document.getElementById('boton');
enviar.addEventListener('click', enviarFormulario,false);


//funciones




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
function rellenapregunas(){
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

//llenar los arrays todo con false
function creaArrays(){
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


//comparar dos objetos
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

function comprobarRespuestas(){

	if(!booltest){

	rellenarespuestas();
	
	for(i= 0 ; i< formularios.length ; i++){
		comparar(preguntas[i], respuestas[i]);

	}
	booltest=true;
	enviar.removeEventListener('click',enviarFormulario,false);
	console.log("aciertos: " + aciertos + " fallos: " + fallos);
	console.log("enviando forrmulario");
	console.log("preguntas");
	console.log(preguntas);
	console.log("respuestas");
	console.log(respuestas);
	}else{
		alert("Usted ya ha contestado al test");
	}
}

function puntuacion(){
	var x =( ((aciertos - (fallos/2))*100) / formularios.length).toFixed(2);

	resultado.porcentaje= x.toString();
	console.log(resultado.porcentaje);
	console.log(x);
}

function divRespuesta(){
divRespuestaVar.innerHTML='<h1>' + resultado.titulo + '</h1>' +
'<p> ' +resultado.subtitulo  + resultado.porcentaje + '%</p>'+'<p> ' +resultado.texto +'</p>'    ; 

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
	//document.getElementById('sombra').style.display="inline";
}

function enviarFormulario(){
	
comprobarRespuestas();
puntuacion();
divRespuesta();	
}
document.oncontextmenu = function(){return false;}
window.addEventListener('load',init, false);

function init(){
//alert("xxx");
creaArrays();
rellenapregunas();
}
