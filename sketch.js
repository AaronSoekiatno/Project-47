var player, barn, animal;
var playerImg, barnImg, cowImg, pigImg, chickImg;
var aniGroup, reset, win;
var PLAY = 1;
var END = 0;
var WIN  = 2;
var gameState = PLAY;
var score = 0;

function preload(){
    win = loadSound('win.mp3.mp3');
    die = loadSound('dead.mp3');

    playerImg = loadImage("player.png");
    bg = loadImage("bg.webp");
    barnImg = loadImage("Barn.png");

    cowImg = loadImage("cow.png");
    pigImg = loadImage("pig.jpg");
    chickImg = loadImage("chick.png");
}

function setup(){
   createCanvas(600,600);
    
    player = createSprite(150,300,10,10);
    player.addImage(playerImg);
    player.setCollider("rectangle",0,0,25,50);

    barn = createSprite(550,150,10,10);
    barn.addImage(barnImg);
    barn.scale = 1.03;
    barn.setCollider("circle",0,0,100);

    aniGroup = new Group();

    reset = createButton("Restart");
    reset.position(300,550);
}

function draw(){
    background(bg);        
    
    if(gameState === PLAY){
        if(keyDown("w")){
            player.y = player.y-4;
        }
    
        if(keyDown("a")){
            player.x = player.x-4;
        }
    
        if(keyDown("d")){
            player.x = player.x+4;
        }
    
        if(keyDown("s")){
            player.y = player.y+4;
        }
    
        spawnAnimals();
        reset.hide();

        score = score+Math.round(getFrameRate()/50);

        if(aniGroup.y>=150){
            aniGroup.setLifetimeEach(0);
        }

        if(aniGroup.collide(player)){
            gameState = END;
            die.play();
        }

        if(barn.collide(player)){
            gameState = WIN;
            win.play();
        }

    }else if(gameState === END){
        aniGroup.setVelocityYEach(0);
        aniGroup.setLifetimeEach(-1);
        reset.show();
    }else if(gameState === WIN){
        aniGroup.setVelocityYEach(0);
        aniGroup.setLifetimeEach(-1);
        reset.show();
        fill(0);
        textSize(30);
        text("YOU WIN",250,70);
    }

    reset.mousePressed(()=>{
        restart();
      });
    
    fill(0);
    textSize(24);
    text("Score: "+score,260,100);
    drawSprites();
}


    function spawnAnimals(){
        if(frameCount%30===0){
            animal = createSprite(325,600,50,50);
            animal.velocityY = -(6+getFrameRate()*3/150);
            animal.x = Math.round(random(320,450));
            animal.y = Math.round(random(540,600));
            animal.lifetime = 50;
            animal.scale = 0.18;
            animal.setCollider("rectangle",0,0,150,200);

            var rn = Math.round(random(1,3));
            switch(rn){
                case 1: animal.addImage(cowImg);
                    break;
                case 2: animal.addImage(pigImg);
                    break;
                case 3: animal.addImage(chickImg);
                    break;
                default: break;
            }

            aniGroup.add(animal);
        }
    }

    function restart(){
        player.x = 150;
        player.y = 300;
        gameState = PLAY;
        aniGroup.destroyEach();
        score = 0;
    }

    