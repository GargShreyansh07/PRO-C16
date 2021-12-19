//Game States
var PLAY=1;
var END=0;
var gameState=1;

var knife,cake ,monster,cakeGroup,monsterGroup, score,r,randomCake, position,background;
var knifeImage , cake1, cake2 ,cake3,cake4, monsterImage, gameOverImage,backgroundImage;
var gameOverSound ,knifeSwoosh;

function preload(){
  backgroundImage = loadImage("background.png");
  
  knifeImage = loadImage("knife.png");
  monsterImage = loadAnimation("alien1.png","alien2.png")
  cake1 = loadImage("cake1.png");
  cake2 = loadImage("cake2.png");
  cake3 = loadImage("cake3.png");
  cake4 = loadImage("cake4.png");
  gameOverImage = loadImage("gameover.png")
  
  gameOverSound = loadSound("gameover.mp3")
  knifeSwooshSound = loadSound("knifeSwoosh.mp3")
}



function setup() {
  createCanvas(600, 600);
  
  scene = createSprite(300,312);
  scene.addImage(backgroundImage);
  scene.scale = 1.3
  //creating sword
   knife=createSprite(40,200,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.25
  
  
  
  //set collider for sword
  knife.setCollider("rectangle",0,0,40,40);

  // Score variables and Groups
  score=0;
  cakeGroup=createGroup();
  monsterGroup=createGroup();
  
}

function draw() {
  background(0);
  
  if(gameState===PLAY){
    
    //Call fruits and Monster function
    cakes();
    Monster();
    
    // Move sword with mouse
    knife.y=World.mouseY;
    knife.x=World.mouseX;
  
    // Increase score if sword touching fruit
    if(cakeGroup.isTouching(knife)){
      cakeGroup.destroyEach();
      
       knifeSwooshSound.play();
      // knifeSwooshSound.play;
      // knifeSwooshSound();
      // knifeSwooshSoundplay();


      // score=score;
      // score=+2;
      // score=2;
       score=score+2;

    }
    else
    {
      // Go to end state if sword touching enemy
      if(monsterGroup.isTouching(knife)){
        gameState=END;
        //gameover sound
        gameOverSound.play()
        
        cakeGroup.destroyEach();
        monsterGroup.destroyEach();
        cakeGroup.setVelocityXEach(0);
        monsterGroup.setVelocityXEach(0);
        
        // Change the animation of sword to gameover and reset its position
        knife.addImage(gameOverImage);
        knife.scale=2;
        knife.x=300;
        knife.y=300;
      }
    }
  }
  
  drawSprites();
  //Display score
  textSize(25);
  text("Score : "+ score,250,50);
}


function Monster(){
  if(World.frameCount%200===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,550));
    monster.velocityX=-(8+(score/10));
    monster.setLifetime=50;
    
    monsterGroup.add(monster);
  }
}

function cakes(){
  if(World.frameCount%80===0){
    cake=createSprite(400,200,20,20);
    cake.x = 0    
  //Increase the velocity of cake after score 4 

       cake.velocityX= (7+(score/4));
     
     
    cake.scale=0.38;
     //fruit.debug=true;
     r=Math.round(random(1,4));
    if (r == 1) {
      cake.addImage(cake1);
    } else if (r == 2) {
      cake.addImage(cake2);
    } else if (r == 3) {
      cake.addImage(cake3);
    } else {
      cake.addImage(cake4);
    }
    
    cake.y=Math.round(random(50,550));
   
    
    cake.setLifetime=100;
    
    cakeGroup.add(cake);
  }
}