const canvas = document.querySelector("#game");
const game = canvas.getContext('2d');
let canvasSize
let elementsSize;



window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);


function setCanvasSize (){
    if (window.innerHeight > window.innerWidth){
        canvasSize = window.innerWidth * 0.8;
    } else {
        canvasSize = window.innerHeight * 0.8;
    }

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);
    elementsSize = canvasSize / 10;
    startGame();
}

function startGame(){
    game.font = elementsSize + 'px Verdana';
    game.textAlign = 'end';
    const map = maps[1];
    const mapRows = map.trim().split('\n');
    const mapRowCols = mapRows.map(row => row.trim().split(''));
    
    mapRowCols.forEach((row, rowI) => {
        row.forEach((col, colI) =>{
            const emoji = emojis[col];
            const posX =  elementsSize * (colI + 1.2);
            const posY = elementsSize * (rowI + 0.85);
            game.fillText(emoji,posX , posY);
        })
    });
    
    // for (let row = 1; row <= 10; row++){
    //     for (let col = 1; col <= 10; col++){
    //         game.fillText(emojis[mapRowCols[row-1][col-1]], elementsSize*col,elementsSize*row);
    //     } 
    // } 

    // game.fillRect(100,25,100,100);
    // game.clearRect(125,50,50,50);
    // game.font = '25px verdana'
    //game.fillStyle = 'purple';
    // game.textAlign = 'left'
    // game.fillText('PLATZI', 25,25);
}