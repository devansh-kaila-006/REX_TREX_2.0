var trex,trex2,teri,teri2,teri3;                         
var ground,ground2,ground3,ground4,ground5,gg;   
var cloud,c1,count,bg;                      
var obstacle,ob,ob1,ob2,ob3,ob4,ob5;             
var gameOver,go,rr,restart;                   
var obstacleGroup,cloudGroup;                                
var PLAY,END;
var rand;
var cp,dd,ju;
localStorage["HighScore"] = 0;

function preload(){ 
  
  teri  = loadAnimation("trex1.png","trex3.png","trex4.png");
  teri2 = loadAnimation("trex_collided.png");
  teri3 = loadAnimation("trex1.png");
  gg    = loadAnimation("ground2.png");
  c1    = loadAnimation("cloud.png");
  ob    = loadAnimation("obstacle1.png");
  ob1   = loadAnimation("obstacle2.png");
  ob2   = loadAnimation("obstacle3.png");
  ob3   = loadAnimation("obstacle4.png");
  ob4   = loadAnimation("obstacle5.png");
  ob5   = loadAnimation("obstacle6.png");
  go    = loadAnimation("gameOver.png");
  rr    = loadAnimation("restart.png");
  cp    = loadSound("checkPoint.mp3");
  dd    = loadSound("die.mp3"); 
  ju    = loadSound("jump.mp3");
  
  }

function setup() {
 createCanvas(600,300);
  
 trex=createSprite(50,260,20,20);
 trex.addAnimation("trex_move",teri);
 trex.addAnimation("collided",teri2);
 trex.addAnimation("TREX_PAUSE",teri3); 
 trex.scale=0.6; 
 trex.setCollider("circle",0,-12.5,40);
  
 ground=createSprite(200,280,400,20);
 ground.addAnimation("ground_move",gg);
 ground.velocityX=-8;
 ground.x=ground.width/2;
  
 ground2=createSprite(300,290,600,20);
 ground3=createSprite(300,295,600,10);
  
 gameOver=createSprite(300,130,10,10); 
 gameOver.addAnimation("#gameover",go); 
  
 restart=createSprite(300,190,10,10); 
 restart.addAnimation("#restart",rr);
 restart.scale=0.6;
  
 count=0; 
 bg=255; 
  
  
 obstacleGroup = createGroup();
 cloudGroup = createGroup(); 
  
  PLAY = 1;
  END = 0;
  gameState = PLAY;
  
}

function draw() { 
 //trex.debug=true;
    background(count/5-count/10);
  
    if(gameState === PLAY){
    
    trex.x=50;
   
   ground.velocityX=-(8+3*count/250);
   ground2.visible=false;
   ground3.visible=false;
   gameOver.visible=false;
   restart.visible=false; 
   
   trex.collide(ground2);
   obstacleGroup.collide(ground3); 
   
   count=                                                                    count - Math.round(World.frameRate/60) +  Math.round(World.frameRate/25);
   
    if(keyDown("space") && trex.y >= 258){
      ju.play();
      trex.velocityY=-16;
    }
    
     trex.velocityY=trex.velocityY+1;
  
    if(trex.y <= 250){
      trex.changeAnimation("TREX_PAUSE",teri3);
    } 
    
    if(trex.y >= 220){
      trex.changeAnimation("trex_move",teri);
   }
    
  if(ground.x < 0){
    ground.x=ground.width/2;
  }
      
  if(count % 100 === 0){
    cp.play();
  }   

  spawnClouds();
  spawnObstacles();
    
  } 
  
   if(trex.isTouching(obstacleGroup)){
     trex.pause(); 
     dd.play();
     gameState=END;
     trex.collide(ground2);
     obstacleGroup.collide(ground3);
     
  }
  
 
 else if(gameState === END){
    
    dd.pause;
    ground.velocityX=0;
    trex.velocityY=0;
   
    trex.x=50;
    trex.changeAnimation("collided",teri2);
   
    trex.collide(ground2);
    obstacleGroup.collide(ground3); 
   
    gameOver.visible=true;
    restart.visible=true;
     
    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    
    obstacleGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1); 
  
  if(mousePressedOver(restart)){
    //count=0;
    reset();
   
   }
  
  }
  
  drawSprites();
  
  
  fill("purple");
   textSize(17.5);
   textStyle(BOLD);
   textFont("Georgia");
   text("Score : "+count,475,30);
   text("Highest Score : "+localStorage["HighScore"],25,30);
  
}

function reset(){
   
  gameState=PLAY;
  trex.changeAnimation("trex_move",teri);
  trex.play();
  gameOver.visible=false;
  restart.visible=false;
  trex.collide(ground2);
  obstacleGroup.collide(ground3);
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  
  if(localStorage["HighScore"] < count){
    localStorage["HighScore"] = count;
    
  }
  console.log("my highest score is " + localStorage["HighScore"]);
  count=0;
}

function spawnClouds() {
  
  if(frameCount % 50 === 0){
    cloud=createSprite(650,random(70,150),20,20);
    cloud.addAnimation("clouds",c1);
    cloud.velocityX=-9;
    
    cloud.lifetime=175;
    
    cloud.depth=trex.depth;
    trex.depth=trex.depth+1;
    
    gameOver.depth=cloud.depth;
    gameOver.depth=gameOver.depth+1;
    
    cloudGroup.add(cloud);
    
  }  
  
} 

function spawnObstacles() {
  
  if(frameCount % 40 === 0){   
    
  obstacle = createSprite(625,260,20,20);
  obstacle.velocityX=-(9+3*count/175);
  
  rand = Math.round(random(1,6));
    
  switch(rand){
      
    case 1:obstacle.addAnimation("cacti",ob);
           obstacle.scale=0.7;
     break; 
    case 2:obstacle.addAnimation("cacti",ob1);   
           obstacle.scale=0.8;
      break;  
    case 3:obstacle.addAnimation("cacti",ob2);
           obstacle.scale=0.8;
     break;
    case 4:obstacle.addAnimation("cacti",ob3);
           obstacle.scale=0.6;
     break;
    case 5:obstacle.addAnimation("cacti",ob4); 
           obstacle.scale=0.6;
     break;
    case 6:obstacle.addAnimation("cacti",ob5);
           obstacle.scale=0.6;
     break; 
     
         }
  
   obstacle.lifetime=175;   
   obstacleGroup.add(obstacle);
    
  }
}
