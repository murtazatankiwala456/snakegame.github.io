//initial variables 
let inputDir ={x:0,y:0};//the direction of snake cordinates is 0
const foodSound=new Audio('./music/food.mp3');
const gameOverSound=new Audio('./music/gameover.mp3');
const moveSound=new Audio('./music/move.mp3');
const musicSound=new Audio('./music/music.mp3');
let speed=5;
let score=0;
let lastPaintTime=0
let snakeArr=[
    {x:13,y:15}
];
let food={x:6,y:7};

// Add touch event listeners to handle input on mobile devices
document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);

let xDown = null;                                                        
let yDown = null;

function handleTouchStart(evt) {
    xDown = evt.touches[0].clientX;                                      
    yDown = evt.touches[0].clientY;                                      
};                                                

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    let xUp = evt.touches[0].clientX;                                    
    let yUp = evt.touches[0].clientY;

    let xDiff = xDown - xUp;
    let yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            /* left swipe */
            inputDir = { x: -1, y: 0 };
        } else {
            /* right swipe */
            inputDir = { x: 1, y: 0 };
        }                       
    } else {
        if ( yDiff > 0 ) {
            /* up swipe */
            inputDir = { x: 0, y: -1 };
        } else { 
            /* down swipe */
            inputDir = { x: 0, y: 1 };
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
};




// Game Functions
function main(ctime){
    window.requestAnimationFrame(main) //to repeadly call main function again and again
    if((ctime -lastPaintTime) /1000 < 1/speed){ //we basically put a condition that if current time is less then 1 n half of speed then you stop repaint the animation frame bcz the it renders very speedly which make impossible to play the game
        return;
    }
    lastPaintTime=ctime;
    gameEngine();


//Game over 
    function isCollide(snake){
        //if you bump into yourself
        for (let i = 1; i < snakeArr.length; i++) {
          if(snake[i].x === snake[0].x && snake[i].y === snake[0].y ){
            return true;
          }
        }
        //if you bump into the wall
          if(snake[0].x >=18 || snake[0].x <=0 || snake[0].y >=18 || snake[0].y <=0){
            return true;
          }
        
    }


    //Start new game

    function gameEngine(){
        //part 1: updating the snake array & food
        if(isCollide(snakeArr)){
            gameOverSound.play();
            musicSound.pause()
            inputDir= {x:0,y:0};
            alert('Game Over.Press any key to play again!');
            snakeArr=[{x:13,y:15}];
            musicSound.play();
            score=0
            
        }
        //Game snake Update and Move
        //if you eaten the food,increament the score and regenerate the food
        if(snakeArr[0].y ===food.y && snakeArr[0].x === food.x){
            foodSound.play()
            score += 1
            scoreBox.innerHTML= `Score:${score}`
            snakeArr.unshift({x:snakeArr[0].x + inputDir.x,y:snakeArr[0].y + inputDir.y});
            let a=2;
            let b=16;
            food={x:Math.round(a + (b-a) * Math.random()),y:Math.round(a + (b-a) * Math.random())}
        }
       //Moving the snake
       for (let i= snakeArr.length -2; i >= 0; i--) {
       
        snakeArr[i+1]={...snakeArr[i]};
        
       }
       snakeArr[0].x += inputDir.x
       snakeArr[0].y += inputDir.y

        //part 2:Display the snake 
        board.innerHTML="";
        snakeArr.forEach((e,index)=>{
            snakeElement=document.createElement('div');
            snakeElement.style.gridRowStart= e.y;
            snakeElement.style.gridColumnStart=e.x;
            if(index === 0){
                snakeElement.classList.add('head');
            }else{
                snakeElement.classList.add('snake');
            }
           
            board.appendChild(snakeElement);
        });
        //Display the food
        foodElement=document.createElement('div');
        foodElement.style.gridRowStart= food.y;
        foodElement.style.gridColumnStart=food.x;
        foodElement.classList.add('food')
        board.appendChild(foodElement);
    }
   
}













//there is a function in windows specifically for animation and its take arg as func main which we created.The window.requestAnimationFrame() method tells the browser that you wish to perform an animation and requests that the browser calls a specified function to update an animation before the next repaint. The method takes a callback as an argument to be invoked before the repaint.

window.requestAnimationFrame(main)

//How actaully games works;- All depend on x and y cordinates,it's a Fundamental of logic.
//main logic here:-
window.addEventListener('keydown', e =>{
 musicSound.play()
 inputDir={x:0, y:1} //start the game
 moveSound.play();

 switch (e.key) {
    case "ArrowUp":
        console.log("ArrowUp");
        inputDir.x=0;
        inputDir.y=-1;
        break;

    case "ArrowDown":
        console.log("ArrowDown");
        inputDir.x=0;
        inputDir.y=1;
        break;

    case "ArrowLeft":
        console.log("ArrowLeft");
        inputDir.x=-1;
        inputDir.y=0;
        break;

    case "ArrowRight":
        console.log("ArrowRight");
        inputDir.x=1;
        inputDir.y=0;
        break;
 
    default:
        break;
 }
})