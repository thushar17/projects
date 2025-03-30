let inputDir = {x:0 , y:0}
const foodSound= new Audio('food.mp3')
const gameOverSound= new Audio('gameover.mp3')
const moveSound= new Audio('move.mp3')
const musicSound= new Audio('music.mp3')
const board = document.querySelector('.board');
let hiscore=document.querySelector('.highscore')
let speed=7;
let lastPaintTime=0
let SnakeArr=[
    {x:13,y:15}
]
let score=document.querySelector('.score')
let score1=0
food={x:6, y:7}
// Functions name
function main(ctime){
    window.requestAnimationFrame(main)
    // console.log(ctime)
    if((ctime-lastPaintTime)/1000<1/speed){
        return
    }
    lastPaintTime=ctime
    gameEngine()
}
function isCollide(SnakeArr) {
     // if ssnake bump in itself
     for (let i = 1; i < SnakeArr.length; i++) {
        if (SnakeArr[i].x === SnakeArr[0].x && SnakeArr[i].y === SnakeArr[0].y) {
            return true;
        }
    }
        // if u bump into the wall
        if (SnakeArr[0].x>=18 || SnakeArr[0].x <0 || SnakeArr[0].y>=18 || SnakeArr[0].y <0) {
            return true;
        } 
        return false;
     }
function gameEngine(){
    // snake display
    if (isCollide(SnakeArr)) {
        gameOverSound.play()
        musicSound.pause()
        inputDir={x:0 , y:0}
        alert("Game over. Press any key to play again")
        musicSound.play() 
        score1=0
        score.innerHTML="Score:"+score1
        SnakeArr=[  {x:13,y:15}]

    }
    // snake eaten food 
    if(SnakeArr[0].y===food.y && SnakeArr[0].x===food.x) {
       
        foodSound.play() 
        SnakeArr.unshift({x:SnakeArr[0].x+inputDir.x, y:SnakeArr[0].y+inputDir.y})
        let a=2
        let b=16
        food={x:  Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
        score1+=1
        score.innerHTML="Score:"+score1;
        if (score1>highScoreval) {
            highScoreval=score1;
            localStorage.setItem("High Score",JSON.stringify(highScoreval))
            hiscore.innerHTML= "High Score:"+highScoreval
        }
    }
    //moving the snake
    for (let i = SnakeArr.length-2; i >=0; i--) {
        // const element = array[i];
        SnakeArr[i+1]={...SnakeArr[i]} // note ******************

        
    }
    SnakeArr[0].x+=inputDir.x;
    SnakeArr[0].y+=inputDir.y; 


     board.innerHTML ="";
     SnakeArr.forEach((e,index)=>{
       let snakeElement=document.createElement('div')
       snakeElement.style.gridRowStart=e.y;
       snakeElement.style.gridColumnStart=e.x;
       if(index===0){
           snakeElement.classList.add('head')
        }
        else{
           snakeElement.classList.add('snake')

       }
       board.appendChild(snakeElement)
     })
    //  food display
   let foodElement=document.createElement('div')
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement)
}

// Game logic
musicSound.play() 
let highScoreval
let highScore=localStorage.getItem('High Score')
if (highScore===null) {
     highScoreval=0;
    localStorage.setItem("High Score",JSON.stringify(highScoreval))
    
}
else{
    highScoreval=JSON.parse(highScore)
    // highScore.innerHTML= "High Score:"+highScore
    hiscore.innerHTML="High Score"+ highScoreval
}
window.requestAnimationFrame(main)
window.addEventListener('keydown',(e)=>{
    if (inputDir.x !== 0 || inputDir.y !== 0) {
        moveSound.play();
    }
    // inputDir={x:0,y:1}// start game
    // moveSound.play() 
    switch (e.key) {
        case "w":
            console.log("ArrowUp")
            inputDir.x=0
            inputDir.y=-1
            break;
        case "s":
            console.log("ArrowDown")
            inputDir.x=0
            inputDir.y=1
            break;
        case "d":
            console.log("ArrowRight")
            inputDir.x=1
            inputDir.y=0

            break;
        case "a":
            console.log("ArrowLeft")
            inputDir.x=-1
            inputDir.y=0
            break;
    
        default:
            break;
    }
})