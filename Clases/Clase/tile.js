var canvas = document.getElementById("tile");
var ctx = canvas.getContext('2d');   //pincel 

var canvas_escenario = document.getElementById("escenario");
var ctx_escenario = canvas_escenario.getContext('2d');   //pincel 
var rejilla = document.getElementById("rejilla");
var textarea = document.getElementById("textarea");
var texto = document.getElementById("texto");


var img = new Image();
img.src = "Tileset2.png";
//Varables canvas
var xTile = 0;
var yTile = 0;
//Variables canvas_escenario
var xTile_escenario = 0;
var yTile_escenario = 0;

//Obtenemos los limites de los canvas
const rectTile = canvas.getBoundingClientRect();
const rectTile_escenario = canvas_escenario.getBoundingClientRect();


img.onload = function (){ //carga la imagen y despues ejecuta la funcion 
	draw()
	draw_escenario();
}

//para agregar escuchadores, detecta eventos 
canvas.addEventListener('mousedown',manejadorRaton, false);
canvas_escenario.addEventListener('mousedown',manejadorRaton_escenario, false);
rejilla.addEventListener('change',manejadorRejilla);
texto.addEventListener('change', leerTexto);

// j filas
// i col
var M = [];
for (j = 0; j < 20; j++ ){
	M[j] = new Array (40);
	for (i = 0; i < 40; i++)
		M[j][i] = -1;
}

function leerTexto(e){
	var archivo = e.target.files[0];
	if ( !archivo ){
		console.log("Hubo problemas");
		return
	}
	let reader = new FileReader(); //Declaramos una variable de tipo file
	console.log("Hola");
	reader.onloadend=() =>  LeerContenido(reader.result);
	reader.readAsText(archivo,"ISO-8859-1");
	//console.log(reader);
}

function LeerContenido(contenido){
	let lineas = contenido.split(/ /);
	console.log(lineas)
	for (i = 0; i < 800; i++){ //Porque el escenario es de 40*20
		M[Math.floor(i/40)][i%40] = parseInt(lineas[i]);
	}
	//console.log(M);
	draw_escenario();
}


function manejadorRejilla(){
	console.log(rejilla.checked);
	draw_escenario();

}

function manejadorRaton_escenario(e){
	//console.log("manejadorRaton_escenario");
	var relativeX_escenario = e.clientX - rectTile_escenario.left;
	var relativeY_escenario = e.clientY - rectTile_escenario.top;
	xTile_escenario = Math.floor(relativeX_escenario/32);
	yTile_escenario = Math.floor(relativeY_escenario/32);
	//console.log(xTile_escenario,yTile_escenario);

	M [yTile_escenario][xTile_escenario] = yTile*6 + xTile;
	//console.log(M);
	draw_escenario();
	

}

function manejadorRaton(e){
	var relativeX = e.clientX - rectTile.left;
	var relativeY = e.clientY - rectTile.top;
	//console.log(relativeX,relativeY);
	xTile=Math.floor(relativeX/32);
	yTile=Math.floor(relativeY/32);
	//console.log(xTile,yTile);

	draw();
	//ctx.globalAlpha = 0.5;
	//ctx.fillStyle="rgb(0,0,255)";
	//ctx.fillRect(xTile*32,yTile*32,32,32); //Dibuja el rectangulo
	//ctx.globalAlpha = 1;
}

function draw()
{
	//Borra el canvas
	//ctx.fillStyle="rgb(255,255,255)";
	//ctx.fillRect(0,0,canvas.width,canvas.height); //Dibuja el rectangulo

	ctx.clearRect(0,0,canvas.width,canvas.height);

	ctx.drawImage(img,0,0);
	ctx.strokeStyle = '#F00'
	//dibuja la reticula
	for(i=0; i<=6; i++){
		ctx.moveTo(i*32,0)
		ctx.lineTo(i*32,448)
		ctx.stroke()
	}

	for(i=0; i<=14; i++){
		ctx.moveTo(0, i*32)
		ctx.lineTo(448, i*32)
		ctx.stroke()
	}

	//Dibuja el cuadrito default
	ctx.globalAlpha = 0.5;
	ctx.fillStyle="rgb(0,0,255)";
	ctx.fillRect(xTile*32,yTile*32,32,32); //Dibuja el rectangulo
	ctx.globalAlpha = 1;

}

function draw_escenario()
{
	//DIBUJAMOS RECT, limpiar la pantalla

	ctx_escenario.clearRect(0,0,canvas_escenario.width,canvas_escenario.height);

	ctx_escenario.strokeStyle = '#F00'

	if (rejilla.checked)
		Dibuja_Rejilla();

	textarea.value = "";
	//Dibujamos la porcion de imagen
	for (j = 0; j < 20; j++ ){
		for (i = 0; i < 40; i++){
			if (M [j][i] != -1){
				ctx_escenario.drawImage(img, 
					(M[j][i]%6)*32, Math.floor((M[j][i]/6))*32, 
					32 , 32, 
					i*32, j*32, 
					32, 32);//(en donde empieza, ancho y alto, a donde, ancho y alto)
				textarea.value += M[j][i] + " ";
			}
			else{
				textarea.value += " -1 "
			}
		}
	}
	console.log(textarea.value);

}

function Dibuja_Rejilla(){

	//PONEMOS LA RETICULA
	for(i=0; i<=40; i++){
		ctx_escenario.moveTo(i*32,0)
		ctx_escenario.lineTo(i*32,640)
		ctx_escenario.stroke()
	}

	for(i=0; i<=20; i++){
		ctx_escenario.moveTo(0, i*32)
		ctx_escenario.lineTo(1280, i*32)
		ctx_escenario.stroke()
	}
		
}