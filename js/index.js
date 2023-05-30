let inputDir={x:0,y:0};
const foodSound=new Audio('/music/food.mp3');
const gameOverSound=new Audio('/music/gameover.mp3');
const moveSound=new Audio('/music/move.mp3');
const musicSound=new Audio('/music/music.mp3');
  let lastPaintTime=0;
  let speed=5;
  let snakeArr=[{x:13 ,y:15}];
  let food={x:6, y:7};
  let score=0;
  // when u are playing a game every time u need a new screen so this is painting the screen
function main(ctime)
{
    window.requestAnimationFrame(main);
    //console.log(ctime);
    if(((ctime-lastPaintTime)/1000)<1/speed)
    {
    return;
    }
        lastPaintTime=ctime;
        gameEngine();
}
// when collides with wall or pumps into it.
function iscollide(sarr)
{
    // if u bump into yourself
    for(let i=1;i<snakeArr.length;i++)
    {
        if(snakeArr[i].x===snakeArr[0].x && snakeArr[i].y===snakeArr[0].y)
        return true;
       
    }
    if(snakeArr[0].x>=18 || snakeArr[0].x<=0 || snakeArr[0].y>=18 || snakeArr[0]<=0)
    {
        return true;
    }
    return false;
}

function gameEngine()
{
    // if collison happens
    if(iscollide(snakeArr))
    {
        gameOverSound.play();
        musicSound.pause();
        inputDir={x:0,y:0};
        alert("Game Over :: Press any key to play again");
        snakeArr=[{x:13,y:15}];
        musicSound.play();
        score=0;
    }
    // if u have eaten the food u need to increment the score and regenrate the food.
if(snakeArr[0].y===food.y && snakeArr[0].x===food.x )
{
    foodSound.play();
    score+=1;
    if(score>hiscoreval)
    {
        hiscoreval=score;
        localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
        hiscoreBox.innerHTML="HiScore: "+hiscoreval;
    }
    scoreBox.innerHTML="Score: "+score;
    snakeArr.unshift({x:snakeArr[0].x+inputDir.x, y:snakeArr[0].y+inputDir.y});
    // generate new random food loaction
    let a=2;
    let b=16;
    // the random number is generated between the value a and b basically grid lebgth n breadth.
    food={x:Math.round(a+(b-a)*Math.random()),y: Math.round(a+(b-a)*Math.random())};
}
// moving the snake. To move a snake keep one segment over another .
 for(let i=snakeArr.length-2;i>=0;i--)
 {
        //destructuring by creating new object to avoid referencde problem
        snakeArr[i+1]={...snakeArr[i]};
 }
 snakeArr[0].x +=inputDir.x;
 snakeArr[0].y +=inputDir.y;
 // DISPLAP the snake and food.
   // CLEAR board html every time
    board.innerHTML="";
     // display the snake
    snakeArr.forEach((e, index) => {
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
      
        if(index===0)
        {
            snakeElement.classList.add('head');
        }
        else{
        snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
});
//display the food
foodElement=document.createElement('div');
        foodElement.style.gridRowStart=food.y;
        foodElement.style.gridColumnStart=food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);
}

// MAIN logic 
let hiscore=localStorage.getItem("hiscore");
if(hiscore===null)
{
    hiscoreval=0;
    localStorage.setItem("Hiscore: ",JSON.stringify(hiscoreval))
}
else{
    hiscoreval=JSON.parse(hiscore);
    hiscoreBox.innerHTML="Hiscore: "+hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    //start the game
    inputDir={x:0,y:1}
    moveSound.play();
    switch (e.key)
    {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x=0;
            inputDir.y=-1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x=0;
            inputDir.y=+1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x=-1;
            inputDir.y=0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x=+1;
            inputDir.y=0;
            break;
        default:
            break;

    }
});