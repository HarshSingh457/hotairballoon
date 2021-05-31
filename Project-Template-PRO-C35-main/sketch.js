var balloon,balloonImage1,balloonImage2;
// create database and position variable here
var database,position;
var bg,sound;
function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon2.png","hotairballoon3.png");
  sound=loadSound("music.mp3");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1300,650);
  balloon=createSprite(250,600,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  sound.play();
  var positionRef = database.ref("balloon/position");
  positionRef.on("value", readPosition, showError);

  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);
  if(position != undefined){
    if(keyDown(LEFT_ARROW)){
      balloon.addAnimation("hotAirBalloon",balloonImage2);
      writePosition(-3,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      balloon.addAnimation("hotAirBalloon",balloonImage2);
      writePosition(3,0);
    }
    else if(keyDown(UP_ARROW)){
      writePosition(0,-3);
      balloon.addAnimation("hotAirBalloon",balloonImage2);
      balloon.scale = balloon.scale -0.001;
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,3);
      balloon.addAnimation("hotAirBalloon",balloonImage2);
      balloon.scale = balloon.scale +0.001;
    }
    drawSprites();
  }
  fill(0);
  stroke("white");
  textSize(25);
  text("Use arrow keys to move Hot Air Balloon!",40,40);
}

function writePosition(x,y){
  var positionRef = database.ref("balloon/position");
  positionRef.update({
    'x' : position.x + x,
    'y' : position.y + y
  })
  
}

function readPosition(data){
  position = data.val();
  balloon.x = position.x
  balloon.y = position.y
}

function showError(){
  console.log("there is some error");
}
