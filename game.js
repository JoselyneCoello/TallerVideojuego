const canvas = document.querySelector("#game");
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');
let enemyPositions = [];
const playerPosition = {
    x: undefined,
    y:undefined,
};
const giftPosition = {
    x: undefined,
    y:undefined,
};


let canvasSize
let elementsSize;
let level = 0;
let lives = 3;


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
    const map = maps[level];
    if (!map){
        gameWin();
        return;
    }
    const mapRows = map.trim().split('\n');
    const mapRowCols = mapRows.map(row => row.trim().split(''));
    
    enemyPositions = [];
    game.clearRect(0,0, canvasSize, canvasSize);

    mapRowCols.forEach((row, rowI) => {
        row.forEach((col, colI) =>{
            const emoji = emojis[col];
            const posX =  elementsSize * (colI + 1.2);
            const posY = elementsSize * (rowI + 0.85);

            if (col == 'O'){
                if (!playerPosition.x && !playerPosition.y){
                    playerPosition.x = posX;
                    playerPosition.y = posY;
                }
            } else if( col == 'I'){
                giftPosition.x = posX;
                giftPosition.y = posY;
            } else if (col == 'X') {
                enemyPositions.push({
                    x: posX,
                    y: posY,
                })
            }

            game.fillText(emoji,posX , posY);
        });
    });

    movePlayer();
    
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

function movePlayer(){
    const giftPositionX = playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3);
    const giftPositionY = playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3);
    const giftCollision = giftPositionX && giftPositionY;
    if( giftCollision){
        levelwin();
    }
    const enemyCollision = enemyPositions.find(enemy => {
        const enemyCollisionX = enemy.x.toFixed(3) == playerPosition.x.toFixed(3);
        const enemyCollisionY = enemy.y.toFixed(3) == playerPosition.y.toFixed(3);
        return enemyCollisionX && enemyCollisionY;
    });
    if (enemyCollision){
        levelfail();
    }

    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

function levelwin(){
    level++;
    startGame();
}

function levelfail(){
    lives--;
    if (lives <= 0){
        level = 0;
        lives = 3;
    }
    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame();
}

function gameWin(){
    console.log("!Ganasteee!");
}


window.addEventListener('keydown', moveByKeys);
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

function moveByKeys(event){
    if (event.key == 'ArrowUp')
        moveUp();
    else if ( event.key == 'ArrowLeft')
        moveLeft();
    else if ( event.key == 'ArrowRight')
        moveRight();
    else if ( event.key == 'ArrowDown')
        moveDown();
}
function moveUp(){
    if ((playerPosition.y - elementsSize) < 0){
        console.log('OUT');
    } else{
        playerPosition.y -= elementsSize;
        startGame();
    }
}
function moveLeft(){
    if ((playerPosition.x - elementsSize) < elementsSize){
        console.log('OUT');
    } else{
        playerPosition.x -= elementsSize;
        startGame();
    }
}
function moveRight(){
    if ((playerPosition.x + elementsSize) > canvasSize){
        console.log('OUT');
    } else{
        playerPosition.x += elementsSize;
        startGame();
    }
}
function moveDown(){
    if ((playerPosition.y + elementsSize) > canvasSize){
        console.log('OUT');
    } else{
        playerPosition.y += elementsSize;
        startGame();
    }
}