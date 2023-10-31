var canvas = document.getElementById("animacion")
var ctx = canvas.getContext('2d')

/**************** Para dibujar la estrella (bola) *******/

var img = new Image()
img.src = "estrellas.png"

var indice = 0
var x = 0
var y = 0
var dx = 2
var dy = 2

let M = 
    [
        [5,5,40,38,40,38], 
        [44,5,40,38,40,38],
        [80,5,33,38,33,38],
        [5,50,40,38,33,38],
        [34,50,40,38,40,38],
        [73,50,40,38,40,38],
    ]
    
img.onload = function() {
    setInterval(draw,10) //Aqui se itera infinitamemnte la funcion draw
}

function dibujaBola() {
    ctx.drawImage(img,M[indice][0],M[indice][1],        //cordenadas de inicio
                      M[indice][2],M[indice][3],        //ancho y alto
                  x,y,M[indice][4]/2,M[indice][5]/2)    //ancho y alto de llegada

    indice = (indice + 1) % 6 //condiciona el ciclo infinito que se repita cada 6
}
/* --------------------Barra------------------- */
var pos_x_barra = canvas.width/2-20
var pos_y_barra = canvas.height-38
var avance_barra_x = 3
var pasos = 5

ancho_barra = 140
alto_barra = 10

function dibujaBarra() {
    ctx.fillStyle = "#000000"
    ctx.fillRect(pos_x_barra,pos_y_barra,ancho_barra,alto_barra)//Dibuja un rectangulo relleno
}

document.addEventListener("keydown",detectarTecla)
function detectarTecla(e) {
    //se asigna valor a el avance de la barra dependiendo de la tecla pulsada
    if(e.keyCode == 39) {
        avance_barra_x = 1 * pasos //avamce a la derecha
    }
    if(e.keyCode == 37) {
        avance_barra_x = -1 * pasos //avance a la izquierda        
    }

    //se cambia el valor de x y pr lo tanto su posicion de redibujo segun la tecla pulsada
    if(avance_barra_x == 1*pasos && !(pos_x_barra > canvas.width -145)) {
        pos_x_barra += avance_barra_x
    }else {
        if((avance_barra_x == -1*pasos) && (pos_x_barra > 0)) {
            pos_x_barra += avance_barra_x
        }
    }
}

function detectar_colision_barra() {
    if(x >= pos_x_barra && x <= pos_x_barra + ancho_barra && y > pos_y_barra - 15) {
        dy = -dy
    }
}
/****************** Ladrillos *******************/
var ancho_ladrillo = 75
var altura_ladrillo = 20
var padding_ladrillo = 10 // relleno?
var separacion_ladrillo = 30

var colores = ["#EE97E5","#267ed8","#5119e7"];
var nivel = 0

let L = 
[
    [   //primer nivel (0)
        [{e:0},{e:0},{e:0},{e:0},{e:0},{e:2},{e:0},{e:0},{e:0}],
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

/***************Dibujar todo*******************/
function inicializar() {
    dx = 0  //to initialize ball
    dy = 0
    pos_x_barra = canvas.width/2-20
    pos_y_barra = canvas.height-30
    dibujaBarra()
    x = pos_x_barra + ancho_barra / 2 - 10
    y = canvas.height-50
}

function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height)
    dibujaBola()
    x += dx
    y += dy

    detectar_colision_barra()

    //Cambia direccion de desplazamiento al colisionar con los bordes del cnavas
    if(x > canvas.width - 30 || x < 0)
        dx = -dx
    if(y > canvas.height - 30 || y < 0)
        dy = -dy

    //Dibujar la barra y incializar la estrella sobre la barra
    if(y > canvas.height - 30) {
        inicializar()
        y = canvas.height - 50
    }else{
        dibujaBarra()
    }
}