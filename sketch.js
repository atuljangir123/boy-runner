var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0;

var boy ,boy_running ,boy_collided;
var coin_Img;
var bird_Img ,bird;
var background_Img ,background1;
var line,line1,line2;
var obstaclesGroup ,obstacle1 ,obstacle2 ,obstacle3 ,obstacle4 ,obstacle5 ,obstacle6;
var barekatesGroup;
var jumpSound ,dieSound ,checkPointSound;
var gameOver, restart;



function preload(){
boy_running = loadAnimation("1.png","2.png","3.png","4.png","5.png","6.png");
coin_Img = loadAnimation("coin1.png","coin2.png","coin3.png","coin4.png","coin5.png","coin6.png",);
bird_Img = loadAnimation("bird1.png","bird2.png","bird3.png");
background_Img = loadImage("bg.jpg");
boy_collided = loadAnimation("collide.png");

obstacle1 = loadImage("snake5.png");
obstacle2 = loadImage("snake6.png");
obstacle3 = loadImage("tree.png");
obstacle4 = loadImage("stone.png");
obstacle5 = loadAnimation("bird1.png","bird2.png","bird3.png")
obstacle6 = loadImage("bike.png");

gameOverImg = loadImage("gameover-1.png");
restartImg = loadImage("restart.png");

jumpSound = loadSound("jump.mp3");
dieSound = loadSound("gameOver.mp3");

checkPointSound = loadSound("checkPoint.mp3")

}

function setup() {
createCanvas(windowWidth, windowHeight);

background1 = createSprite(width-680, height-350);
background1.addImage(background_Img);
background1.scale=3;

boy = createSprite(50,height-80,20,20);
boy.addAnimation("running",boy_running);
boy.addAnimation("collided", boy_collided);
boy.scale = 0.5;

line = createSprite(50,height-70,100,2);
line.visible=false;

line1 = createSprite(width-150,height-100,2,50);
line2 = createSprite(width+2,height-100,2,50);
line1.visible=false;
line2.visible=false;


  gameOver = createSprite(width/2,height/2- 50);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(width/2,height/1.5);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;

  score = 0;


obstaclesGroup = new Group();
barekatesGroup = new Group();
coinsGroup = new Group();
ppsGroup = new Group();
rrsGroup = new Group(); 
hhsGroup = new Group();
psGroup = new Group();
stonesGroup = new Group();
bikessGroup = new Group();
birdsGroup = new Group();
birddsGroup = new Group();
}

function draw() {
  background1.velocityX=-2;
  line2.velocityX=-6;

  score = score + Math.round(getFrameRate()/50);
  
  
  if (gameState===PLAY){

    if(score>0 && score%100 === 0){
      checkPointSound.play() 
   }

  if(line1.isTouching(line2)){
    background1.x=width-680;
    background1.y= height-350;

    line2.x=width+2;
    line2.y=height-100;
  }

  

  if(boy.isTouching(coinsGroup)){
    coinsGroup.destroyEach();
  }
  if(boy.isTouching(rrsGroup)){
    rrsGroup.destroyEach();
  }
  if(boy.isTouching(ppsGroup)){
    ppsGroup.destroyEach();
  }
  if(boy.isTouching(hhsGroup)){
    hhsGroup.destroyEach();
  }
  if(boy.isTouching(psGroup)){
    psGroup.destroyEach();
  }


  if((keyDown("SPACE") || mousePressedOver(boy)) && boy.y  >= height-180) {
    jumpSound.play();
    boy.velocityY = -10;
  }
  if(boy.isTouching(barekatesGroup) || boy.isTouching(obstaclesGroup) || boy.isTouching(psGroup) || boy.isTouching(stonesGroup) || boy.isTouching(bikessGroup) || boy.isTouching(birdsGroup) || boy.isTouching(birddsGroup)){
    gameState = END;
  }
  
  boy.velocityY = boy.velocityY + 1
  
  spawnObstacles();
  spawnberecates(); 
  spawncoins();
  spawnhh();
  spawnrr();
  spawnpp();
  spawntree();
  spawnstone();
  spawnbike();
  spawnbird();
  spawnbirdd();
  }

  else if (gameState === END) {
    
    dieSound.play();

    boy.changeAnimation("collided", boy_collided);

    gameOver.visible = true;
    restart.visible = true;
    
    background1.velocityX = 0;
    boy.velocityY = 0;
  
  stonesGroup.setVelocityXEach(0);
  stonesGroup.setLifetimeEach(-1);  
  barekatesGroup.setVelocityXEach(0);
  obstaclesGroup.setVelocityXEach(0);
  obstaclesGroup.setLifetimeEach(-1);
  barekatesGroup.setLifetimeEach(-1);
  psGroup.setLifetimeEach(-1);
  psGroup.setVelocityXEach(0);
  birdsGroup.setVelocityXEach(0);
  birddsGroup.setVelocityXEach(0);
  bikessGroup.setVelocityXEach(0);
  bikessGroup.setLifetimeEach(-1);
   
coinsGroup.setVelocityXEach(0);
ppsGroup.setVelocityXEach(0);
rrsGroup.setVelocityXEach(0);
hhsGroup.setVelocityXEach(0);
coinsGroup.setLifetimeEach(-1);
ppsGroup.setLifetimeEach(-1);
rrsGroup.setLifetimeEach(-1);
hhsGroup.setLifetimeEach(-1);
birdsGroup.setLifetimeEach(-1);
birddsGroup.setLifetimeEach(-1);

if(line1.isTouching(line2)){
  background1.x=width-680;
  background1.y= height-350;

  line2.x=width+2;
  line2.y=height-100;
}

    if(touches.length>0 || keyDown("SPACE")) {      
      reset();
      touches = []
    }
  }


boy.collide(line);

drawSprites();

textSize(30);
fill("black")
text("Score: "+ score,20,50);
}
function spawnObstacles() {
  if(frameCount % 150 === 0) {
    var obstacle = createSprite(1200,height-90,20,30);
    obstacle.setCollider('circle',0,0,50);
    obstacle.false=true; 

    obstacle.velocityX = -(6 + 2*score/250);
    
    //generate random obstacles
    var rand = Math.round(random(1,2));
     obstacle.addImage(obstacle1);
        
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.4;
    obstacle.lifetime = 300;
    obstacle.depth = boy.depth;
    boy.depth +=1;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function spawnberecates() {
  if(frameCount % 200 === 0) {
    var hj = createSprite(1200,height-85,20,30);
    hj.setCollider('circle',0,0,50);
    hj.debug=false;

    hj.velocityX = -(6 + 2*score/250);
    
    //generate random obstacles
    var rand = Math.round(random(1,2));
      hj.addImage(obstacle2);
    
    //assign scale and lifetime to the obstacle           
    hj.scale = 0.3;
    hj.lifetime = 300;
    hj.depth = boy.depth;
    boy.depth +=1;
    //add each obstacle to the group
    barekatesGroup.add(hj);
  }
}

function spawntree() {
  if(frameCount % 400 === 0) {
    var hh = createSprite(1200,height-85,20,30);
    hh.setCollider('circle',0,0,45);
    hh.debug=false;

    hh.velocityX = -(6 + 2*score/250);
    
    //generate random obstacles
    var rand = Math.round(random(1,2));
      hh.addImage(obstacle3);
    
    //assign scale and lifetime to the obstacle           
    hh.scale = 1;
    hh.lifetime = 300;
    hh.depth = boy.depth;
    boy.depth +=1;
    //add each obstacle to the group
    psGroup.add(hh);
  }
}

function spawnstone() {
  if(frameCount % 280 === 0) {
    var ss = createSprite(1150,height-85,20,30);
    ss.setCollider('circle',0,0,200);
    ss.debug=false;

    ss.velocityX = -(6 + 2*score/250);
    
    //generate random obstacles
    var rand = Math.round(random(20,100));
      ss.addImage(obstacle4);
    
    //assign scale and lifetime to the obstacle           
    ss.scale = 0.1;
    ss.lifetime = 300;
    ss.depth = boy.depth;
    boy.depth +=1;
    //add each obstacle to the group
    stonesGroup.add(ss);
  }
}

function spawncoins() {
  if(frameCount % 150 === 0) {
    var coin = createSprite(1200,height-100,20,30);
    coin.setCollider('circle',0,0,20)
    
    coin.velocityX = -(6 + 2*score/250);
    
    var rand = Math.round(random(1,2));
    coin.addAnimation("coins",coin_Img);
    
             
    coin.scale = 0.05;
    coin.lifetime = 300;
    coinsGroup.add(coin);
  }
}

function spawnhh() {
  if(frameCount % 155 === 0) {
    var coin1 = createSprite(1200,height-100,20,30);
    coin1.setCollider('circle',0,0,20)
  
    coin1.velocityX = -(6 + 2*score/250);
    
    var rand = Math.round(random(1,2));
    coin1.addAnimation("coins",coin_Img);
    
             
    coin1.scale = 0.05;
    coin1.lifetime = 300;
    hhsGroup.add(coin1);
  }
}

function spawnrr() {
  if(frameCount % 160 === 0) {
    var coin2 = createSprite(1200,height-100,20,30);
    coin2.setCollider('circle',0,0,20)
  
    coin2.velocityX = -(6 + 2*score/250);
    
    var rand = Math.round(random(1,2));
    coin2.addAnimation("coins",coin_Img);
    
             
    coin2.scale = 0.05;
    coin2.lifetime = 300;
    rrsGroup.add(coin2);
  }
}

function spawnpp() {
  if(frameCount % 165 === 0) {
    var coin3 = createSprite(1200,height-100,20,30);
    coin3.setCollider('circle',0,0,20)

    coin3.velocityX = -(6 + 2*score/250);
    
    var rand = Math.round(random(1,2));
    coin3.addAnimation("coins",coin_Img);

    coin3.scale = 0.05;
    coin3.lifetime = 300;
    ppsGroup.add(coin3);
  }
}

function spawnbird() {
  if(frameCount % 100 === 0) {
    var bird = createSprite(1200,height-150,20,30);
    bird.setCollider('circle',0,0,20)

    bird.velocityX = -(6 + 2*score/250);
    
    var rand = Math.round(random(1,2));
    bird.addAnimation("birdd",obstacle5);

    bird.scale = 0.2;
    bird.lifetime = 300;
    bird.depth = boy.depth;
    boy.depth +=1;
    birdsGroup.add(bird);
  }
}

function spawnbirdd() {
  if(frameCount % 175 === 0) {
    var birddd = createSprite(1200,height-100,20,30);
    birddd.setCollider('circle',0,0,20)

    birddd.velocityX = -(6 + 2*score/250);
    
    birddd.addAnimation("birdd",obstacle5);

    birddd.scale = 0.2;
    birddd.lifetime = 300;
    birddd.depth = boy.depth;
    boy.depth +=1;
    birddsGroup.add(birddd);
  }
}

function spawnbike() {
  if(frameCount % 350 === 0) {
    var bike = createSprite(1200,height-70,20,30);
    bike.setCollider('rectangle',0,0,100,80);
    bike.debug=false;

    bike.velocityX = -(6 + 2*score/250);
    
    var rand = Math.round(random(2,6));
    bike.addImage(obstacle6);

    bike.scale = 0.8;
    bike.lifetime = 300;
    bikessGroup.add(bike);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  barekatesGroup.destroyEach();
  psGroup.destroyEach();
coinsGroup.destroyEach();
ppsGroup.destroyEach();
rrsGroup.destroyEach();
hhsGroup.destroyEach();
stonesGroup.destroyEach();
bikessGroup.destroyEach();
birdsGroup.destroyEach();
birddsGroup.destroyEach();

boy.changeAnimation("running",boy_running);

  score = 0;
  
}