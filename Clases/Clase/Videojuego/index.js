var canvas = document.getElementById("animacion") //conexión con el canvas 
var pincel = canvas.getContext('2d'); //pincel 

var img = new Image()    // nuevo objeto de tipo imagen
img.src = "estrellas.png" //definimos el nombre de la imagen y de donde la va a tomar
var indice = 0

let M =
    [
        [5,5,40,38,40,38],
        [44,5,40,38,40,38],
        [80,5,33,38,33,38],
        [5,50,40,38,33,38],
        [34,50,40,38,40,38],
        [73,50,40,38,40,38],
    ]



function draw(){
    pincel.clearRect(0,0,canvas.width,canvas.height)
    dibujaBola()
}
//Dibuja la estrella con efecto
function dibujaBola(){
    pincel.drawImage(img,M[indice][0],M[indice][1],M[indice][2],M[indice][3],x,y, M[indice][4]/2,M[indice][5]/2);
    indice = (indice + 1) % 6
}
