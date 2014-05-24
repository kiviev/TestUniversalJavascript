TestUniversalJavascript
=======================

Script para corregir cualquier test, solo hay que poner las respuestas correctas
variables:
-aciertos  -->sumar los aciertos
-fallos  --> sumar los fallos
-booltest --> sirve para comprobar que no se ha contestado el test, mientras esté en false se podrá contestar

-resultado --> se utilizará para llenar el div que aparecerá al final del test con los resultados, cambiando estos, se puede cambiar lo que aparecerá al final con los resultados excepto el porcentaje
-divRespuestaVar -->almacena el div oculto con  id resultado
-preguntas -->array de las preguntas (lo que conteste el usuario)
-respuestas --> array de las respuestas(las respuestas validas para comparar despues)
-formularios --> array con todos los formularios de la pagina(hay uno por cada pregunta en el index). Servira para despues acceder a los checkbox despues y saber cuales estan checked
-enviar --> almacena el boton enviar para despues añadirle un evento click que ejecutará enviarFormulario()

funciones:

-rellenarespuestas() -->asigna las respuestas obtenidas al array respuestas

-rellenapreguntas() --> asigna las opciones buenas a las preguntas. Aqui es donde se cambiarian las respuestas correctas por las que necesitaramos. Se podrá asingnar mas de una respuesta correcta por pregunta

-poblarArrays() --> pobla los arrays preguntas y respuestas, todas las respuestas por ahora serán false

-comparar(preg,resp) --> nos servirá para comparar una pregunta con una respuesta, si pregunta == respuesta se sumara uno a aciertos si es diferente se sumara uno a fallos.   Sin embargo si no se marca ningun checkbox no sumara uno a fallos.  Esto tambien compara si hay mas de una respuesta correcta.

-comprobarRespuestas() --> comprueba que no se haya contestado el test ya y si no es asi, compara las preguntas con las respuestas, ademas, quita el evento al boton, para que no se pueda volver a enviar

-puntuacion() --> establece la puntuacion del test y al div de la respuesta le dirá la nota con la que aparecerá dependiendo del porcentaje de acierto

-divRespuesta() --> llenar y hacer aparecer el div con el resultado del test

-----------Orden de ejecucion -------------

-init() -->  se ejecutará cuando se carge el html.   Esta funcion llama a:
	poblarArrays(); --> primero se pueblan los arrays con todas las respuestas en false
	rellenapreguntas(); --> despues se le cambian las preguntas con lo que ha contestado el usuario

-enviarFormulario() --> funcion para enviar el formulario (se ejecutará cuando el usuario haga click en boton enviar) En esta funcion se llama a:
	comprobarRespuestas(); --> Se comparan las preguntas con las respuestas.
	puntuacion(); --> Se ve que puntuacion se ha obtenido 
	divRespuesta();	--> Se publica el resultadoen el div oculto creado para ello