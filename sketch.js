//create all the variables
var pizzaBoy,pizzaBoyImg;
var pizza,pizzaImg,pizzaGroup;
var city,cityImg;
var pizzaCollected;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var restart,restartImg;
var car,carImg,carGroup;
var invisibleGround;
var gameName,gameNameImg;

function preload(){
  //loads all the images
  pizzaBoyImg = loadImage("pizza_boy.png");
  pizzaImg = loadImage("pizza.png");
  cityImg = loadImage("city.jpg");
  carImg = loadImage("car.png");
  restartImg = loadImage("restart.png");
  gameNameImg = loadImage("game_name.png");
}

function setup() {
  //create the canvas
  createCanvas(windowWidth,windowHeight);
  
  //create the background as city
  city = createSprite(windowWidth/2,windowHeight/2);
  city.addImage(cityImg);
  city.scale = 1.8;
  city.velocityX = -6;
  
  //sets the logo of the game
  gameName = createSprite(windowWidth/2,windowHeight/9,50,50)
  gameName.addImage(gameNameImg);
  gameName.scale = 0.2;
  
  //creates the pizza boy
  pizzaBoy = createSprite(windowWidth/15,windowHeight-140,20,40);
  pizzaBoy.addImage(pizzaBoyImg);
  pizzaBoy.scale = 0.3;
  pizzaBoy.setCollider("rectangle",150,0,540,pizzaBoy.height);
  pizzaBoy.debug = false;
  
  //create restart icon
  restart = createSprite(windowWidth/2,windowHeight/2,windowWidth-50,windowHeight-50);
  restart.addImage(restartImg);
  restart.scale = 0.07;
  
  //create an invisible grouund
  invisibleGround = createSprite(windowWidth/2,windowHeight+     290,windowWidth,windowHeight);
  
  //creats the groups
  carGroup = new Group();
  pizzaGroup = new Group();
  
  //set pizza collected as 0
  pizzaCollected = 0;
}

function draw(){
  //sets the background colour as light green
  background("lightGreen");
  
  if (gameState === PLAY){
    //sets city and pizza boy visible and 
    //make restart and invisible ground as invisible
    restart.visible = false;
    city.visible = true;
    pizzaBoy.visible = true;
    invisibleGround.visible = false;
    
    //make the city infinite
    if (city.x<100){
      city.x = windowWidth/2;
    }
    
    spawnCars();
    spawnPizzas();
    
    //make the pizza boy jump when space bar is pressed
    //or when the touch on the screen
    if (touches.length>0 && trex.y>=windowHeight-170 || keyDown("space") &&       pizzaBoy.y>=windowHeight-170){
      pizzaBoy.velocityY = pizzaBoy.velocityY-8.5;
    }
    
    //gives gravity to the pizza boy
    pizzaBoy.velocityY=pizzaBoy.velocityY+0.9; 
    
    //increase score by one, 
    //of pizza collected when pizza boy touches the pizza
    if (pizzaBoy.isTouching(pizzaGroup)){
      pizzaGroup.destroyEach();
      pizzaCollected = pizzaCollected+1;
    }
    
    //game state goes to end when pizza boy touches the car
    if (pizzaBoy.isTouching(carGroup)){
      gameState = END;
    }
  }
  
  if (gameState === END){
  
  //display "GAME OVER" when game state is end
  stroke("white");
  fill("black");
  textSize(50);
  text("GAME OVER", windowWidth/3,windowHeight-150);

  //make pizza boy and city invisible and restart icon visible
  pizzaBoy.visible = false;
  city.visible = false;
  restart.visible = true;
  
  //destroy the car and pizza
  pizzaGroup.destroyEach();
  carGroup.destroyEach();
  
  //make piza boy velocity as 0
  pizzaBoy.velocityY = 0;
    
  //en mouse is pressed on restart icon, the game restarts
  if (mousePressedOver(restart)){
    reset();
  }
  }
  
  //make oizza boy collide the invisible ground
  pizzaBoy.collide(invisibleGround);
  
  //draws all the sprites
  drawSprites();
  
  //displays "Pizza Collected"
  fill("black");
  textSize(20);
  text("Pizza Collected: "+pizzaCollected,windowWidth/15,windowHeight/11);
}

//function for spawning cars
function spawnCars(){
   if (frameCount%200===0){
    var car = createSprite(windowWidth,windowHeight,30,30); 
    car.addImage(carImg);
    car.scale = 0.25;
    car.velocityX = -(10+pizzaCollected/4);
    car.y = (windowWidth,windowHeight-115);
    car.lifetime = 220;
    car.setCollider("rectangle",0,0,car.width,car.height);
    car.debug = false;
    carGroup.add(car);
  }
}

//function for spawning pizza
function spawnPizzas(){
  if (frameCount%150===0){
    var pizza = createSprite(windowWidth,windowHeight,30,30);
    pizza.addImage(pizzaImg);
    pizza.scale = 0.15;
    pizza.velocityX = -(7+pizzaCollected/2);
    pizza.y = (windowWidth,windowHeight-250);
    pizza.lifetime = 220;
    pizzaGroup.add(pizza);
  }
}

//function for restart
function reset(){
  pizzaCollected = 0;
  gameState = PLAY;
}