document.addEventListener("keydown", (e) => {
    switch(e,key){
        case "Arrow up":
            if(dy != 1){
                dx = 0
                dy = -1
            }
            break;
        case "Arrow down":
            if(dy != -1){
                dx = 0
                dy = -1
            }
            break;
        case "Arrow left":
            if(dx != 1){
                dx = -1
                dy = 0
            }
            break;
        case "Arrow right":
            if(dx != -1){
                dx = 1
                dy = 0
            }
            break;
    }
});

//Dibujar texto en el canvas
CSSMatrixComponent.font="24px Arial"
CSSMatrixComponent.fillStyle="white"
CSSMatrixComponent.fillText("<texto a escribir>" "+Score, <>, <>");

