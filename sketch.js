var gameState="PLAY";
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var gameState;
var score=0;
function preload()
{
  monkey_running =loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png") 
}



function setup()
{
 createCanvas(displayWidth,displayHeight/2); 
 
  monkey=createSprite(100,315,50,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1;
  
  bananaGroup=createGroup();
  obstacleGroup=createGroup();
   
}


function draw() 
{
background("white");
  
  if(gameState==="PLAY"){
  ground=createSprite(400,350,800,10);
  monkey.veocityX=10;
  ground.velocityX=-4;
  ground.x=ground.width/2;
 
  if(keyDown("space")){
     monkey.velocityY=-14;
  }
  monkey.velocityY=monkey.velocityY+ 0.8;
  
  monkey.collide(ground);
  
  food();
  obstacles();
  
 survivalTime=0;
  stroke("black");
  textSize(20);
  fill("black");

  text("Score:"+score,100,50);
    
  }
  
   if(obstacleGroup.isTouching(monkey)){
     monkey.destroy();
     obstacleGroup.destroyEach(); 
     bananaGroup.destroyEach();
     gameState="END"
     
   }

   if(bananaGroup.isTouching(monkey)){
     bananaGroup.destroyEach();
     score=score+100;
   }
   camera.position.x=displayWidth/2;
          
  drawSprites();
  
  if(gameState==="END"){
     stroke("blue");
     fill("blue");
     textSize(30);
     text("GAME OVER",300,200)
   }
 
  
}

function food(){
  if(frameCount%200===0){
    banana=createSprite(810,170,20,20)
    banana.addImage(bananaImage);
    banana.y=Math.round(random(120,200));
    banana.scale=0.07;
    banana.velocityX=-3;
    banana.lifetime=-1;
   bananaGroup.add(banana);
    
  }
}

function obstacles(){
  if(frameCount%450===0){
    obstacle=createSprite(810,330,20,20);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.1;
    obstacle.velocityX=-5;
    obstacle.lifetime=-1;
    obstacleGroup.add(obstacle);
  }
}



