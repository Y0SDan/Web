var canvas = document.getElementById("animacion")
var ctx = canvas.getContext('2d')

/**************** Para dibujar la estrella (bola) *******/

var img = new Image()
img.src = "estrellas.png"

var indice = 0
var x = 0
var y = 0
var dx = 20
var dy = 20

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
    setInterval(draw,0)
}

function dibujaBola() {
    ctx.drawImage(img,M[indice][0],M[indice][1],        //cordenadas de inicio
                      M[indice][2],M[indice][3],        //ancho y alto
                  x,y,M[indice][4]/2,M[indice][5]/2)    //ancho y alto de llegada

    indice = (indice + 1) % 6
}

function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height)
    dibujaBola()
    x += dx
    y += dy

    if(x > canvas.width - 30 || x < 0)
        dx = -dx
    if(y > canvas.height - 30 || y < 0)
        dy = -dy
}

/* --------------------Barra------------------- */

function dibujaBarra() {
    ctx.fillStyle = "#000000"
    ctx.fillRect()
}