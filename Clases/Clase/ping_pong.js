var canvas = document.getElementById("animacion");
var ctx = canvas.getContext('2d');   //pincel 

var img = new Image();
img.src = "estrellas.png";

var dx = 2;
var dy = -2;

var pos_x_barra = canvas.width/2-20;
var pos_y_barra = canvas.height-30;
var avance_barra_x = 3;
var pasos = 5;

ancho_barra = 140;
alto_barra = 10;

var x = pos_x_barra+(ancho_barra/2)-10;
var y = canvas.height-50;

var indice = 0;

var pelotaRadio = 20;

//Ladrillo
var ancho_ladrillo = 75;
var altura_ladrillo = 20;
var padding_ladrillo = 10;
var separacion_ladrillo = 30;

var colores = ["#EE97E5","#267ed8","#5119e7"];
let M = 
    [
        [5,5,40,38,40,38], 
        [44,5,40,38,40,38],
        [80,5,33,38,33,38],
        [5,50,40,38,33,38],
        [34,50,40,38,40,38],
        [73,50,40,38,40,38],
    ]

let L = [
[   //primer nivel (0)
    [{e:2},{e:3},{e:0},{e:1},{e:1},{e:3},{e:2},{e:0},{e:2}], 
    [{e:3},{e:0},{e:0},{e:3},{e:2},{e:2},{e:0},{e:2},{e:3}],
],
[   //segundo nivel (1)
    [{e:2},{e:3},{e:0},{e:1},{e:1},{e:3},{e:2},{e:0},{e:2}], 
    [{e:3},{e:1},{e:2},{e:0},{e:3},{e:0},{e:1},{e:2},{e:3}],
    [{e:2},{e:0},{e:1},{e:1},{e:2},{e:2},{e:0},{e:3},{e:3}],
],
[   //tercer nivel (2)
    [{e:2},{e:3},{e:0},{e:1},{e:1},{e:3},{e:2},{e:0},{e:2}], 
    [{e:3},{e:1},{e:2},{e:0},{e:3},{e:0},{e:1},{e:2},{e:3}],
    [{e:2},{e:0},{e:1},{e:1},{e:2},{e:2},{e:0},{e:3},{e:3}],
    [{e:3},{e:0},{e:0},{e:3},{e:2},{e:2},{e:0},{e:2},{e:3}],
]
]

var nivel = 2;



img.onload = function (){ //carga la imagen y despues ejecuta la funcion 
    setInterval(draw,10);
}

document.addEventListener("keydown",detectarTecla);

function detectarTecla(e){
    if (e.keyCode == 39){
        //console.log("Avanzando a derecha")
        avance_barra_x = 1 * pasos;
    }
    if (e.keyCode == 37){
        //console.log("Avanzando a izquierda")
        avance_barra_x = -1 * pasos;
    }

    //console.log(pos_x_barra)

    if (avance_barra_x == 1*pasos && !(pos_x_barra > canvas.width-145))
        pos_x_barra += avance_barra_x;
    else{
        if((avance_barra_x == -1*pasos)&&(pos_x_barra > 0))
        pos_x_barra += avance_barra_x;
    }
}

function dibuja_ladrillos(){
   
    for (j = 0; j < L[nivel].length; j++ ){
        for (i = 0; i < L[nivel][j].length; i++)
        {
            if(L[nivel][j][i] != 0){
                dibuja_ladrillo(j,i);
            }
        }
    }

}

function dibuja_ladrillo( j,i ){
    var b = L[nivel][j][i];
    console.log(b);
    var x_ladrillo = i*(ancho_ladrillo+padding_ladrillo)+separacion_ladrillo;
    var y_ladrillo = j*(altura_ladrillo+padding_ladrillo)+separacion_ladrillo;
    b.x = x_ladrillo; //agregamos atributo x al objeto 
    b.y = y_ladrillo; //agregamos atributo y al objeto

    if ( b.e != 0){ //b.e tiene la intensidad del ladrillo
        ctx.fillStyle = colores[b.e-1];
        ctx.fillRect(x_ladrillo,y_ladrillo,ancho_ladrillo,altura_ladrillo);
        //ctx.fillStyle = "#000000";
        //ctx.fillRect(200*i+1,100*j+1,ancho_ladrillo,altura_ladrillo-2,ancho_ladrillo,altura_ladrillo-2);
    }

    console.log(L);
}

function detectar_colision_ladrillo(){
    //Detecta colision de la pelota con el ladrillo 
    var total = 0;

    for (j = 0; j < L[nivel].length; j++ ){
        for (i = 0; i < L[nivel][j].length; i++)
        {
            var b = L[nivel][j][i];
            total += b.e;
            if (b.e != 0){
                if (x > b.x && x < b.x+ancho_ladrillo && y > b.y+altura_ladrillo ){
                    b.e -=1;
                }
            }
        }
    }

}

function detectar_colision_barra(){
    if (x >= pos_x_barra && x <= pos_x_barra+ancho_barra && y > pos_y_barra-15)
    {
        //console.log("Colision detectada");
        dy = -dy;
    }
}

function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height); //Agarra el color de fondo de forma automatica
    dibuja_ladrillos();
    dibujaBola();
    x += dx;
    y += dy;
    detectar_colision_barra();
    if (x > canvas.width-30 || x < 0)
        dx = -dx;

    if (y < 0 )
        dy = -dy;
    
    if ( y > canvas.height-30 ){
        inicializar();
        y = canvas.height-50;
    }else
        dibujaBarra();
    

}

function inicializar(){
    dx = 0;
        dy = 0;
        pos_x_barra = canvas.width/2-20;
        pos_y_barra = canvas.height-30;
        dibujaBarra();
        x = pos_x_barra+(ancho_barra/2)-10;
        y = canvas.height-50;
}

function dibujaBola(){
    //dibuja la estrella con efecto
    ctx.drawImage(img,M[indice][0],M[indice][1],M[indice][2],M[indice][3],x,y, M[indice][4]/2,M[indice][5]/2);
    indice = (indice+1) % 6;

}

function dibujaBarra(){
    ctx.fillStyle = "#000000";
    ctx.fillRect(pos_x_barra,pos_y_barra,ancho_barra,alto_barra); //Agarra el color de fondo de forma automatica
    
}