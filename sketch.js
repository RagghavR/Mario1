var mario,ground,ground2,clouds,coins,start,bush,hill,mushroom,bricks,coinbrick,hole,goomba,gameover,retry
var marioI,marioI1,marioI2,marioI3,groundI,cloudsI1,cloudsI2,cloudsI3,coinsI,startI,jumpI,bush1,bush2,bush3,squash,hillI,mushroomI,mushroomI2,bricksI,coinbrickI,coinsbrickI,holeI,goombaI,goombaI2,gameoverI,retryI
var song,jump,powerdown,powerup,death,gameover,coin
var score = 0
var highscore = 0
var gamestate = "start"
var state = 1
var lives = 3

function preload(){
    song = loadSound("Mario Song.mp3")
    jump = loadSound("Jump.mp3")
    powerdown = loadSound("hurt.mp3")
    powerup = loadSound("powerup.mp3")
    death = loadSound("Death.mp3")
    gameovers = loadSound("gameover.mp3")
    coin = loadSound("coin.mp3")
    marioI = loadAnimation("MarioS1.png","MarioS2.png","MarioS3.png")
    marioI1 = loadAnimation("mario standing.png")
    marioI2 = loadAnimation("MarioB1.png","MarioB2.png","MarioB3.png")
    marioI3 = loadAnimation("Mario death.png")
    startI = loadAnimation("Mario1.png","Mario2.png","Mario3.png","Mario4.png","Mario5.png","Mario6.png","Mario7.png")
    groundI = loadImage("Ground.png")
    cloudsI1 = loadImage("Clouds1.png")
    cloudsI2 = loadImage("Clouds2.png")
    cloudsI3 = loadImage("Clouds3.png")
    coinsI = loadImage("coin.png")
    jumpI = loadAnimation("jump.png")
    squash = loadAnimation("goombas.png")
    bush1 = loadImage("bush1.png")
    bush2 = loadImage("bush2.png")
    bush3 = loadImage("bush3.png")
    hillI = loadImage("hill.png")
    mushroomI = loadImage("mushroom.png")
    mushroomI2 = loadImage("mushroom1.png")
    coinbrick = loadAnimation("coinbrick.png")
    holeI = loadImage("hole.png")
    goombaI = loadAnimation("Goomba1.png","Goomba2.png")
    goombaI2 = loadAnimation("goombaS.png")
    gameoverI = loadImage("gameover.png")
    retryI = loadImage("retry.png")
}


function setup() {
    createCanvas(windowWidth,windowHeight);
    song.loop();
    mario = createSprite(width*0.1,height*0.85,10,10)
    mario.addAnimation("stand",marioI1)
    mario.addAnimation("run",marioI)
    mario.addAnimation("bigrun",marioI2)
    mario.addAnimation("die",marioI3)
    mario.scale = 0.35
    //mario.debug = true
    mario.setCollider("rectangle",0,-60,320,350)
    gameover = createSprite(width*2,height*0.45,10,10)
    gameover.addImage(gameoverI)
    retry = createSprite(width*2,height*0.55,10,10)
    retry.scale = 1.5
    retry.addImage(retryI)
    ground = createSprite(width/2,height*0.955,10,10)
    ground.addImage(groundI)
    ground.scale=0.1
    start = createSprite(width/2,height*0.35,10,10)
    start.addAnimation("top",startI)
    start.scale = 1.2
    ground2 = createSprite(width/2,height*0.955,width,60)
    mario.depth = 5
    ground2.visible = false
    cloudg = createGroup()
    bushg = createGroup()
    hillg = createGroup()
    obsg = createGroup()
    holeg = createGroup()
    floorg = createGroup()
    goombag = createGroup()
    floorg.add(ground2)
    state = 1
}


function draw() {
    background (40,123,241)
    drawSprites()
    
if(gamestate ==="start"){
    cloudg.velocityXEach = -10
    mario.x = width*0.1
    mario.y = height*0.85
    mario.changeAnimation("stand",marioI1)
    if(keyDown("space")){
        gamestate = "play"
        start.visible = false
        mario.scale = 0.25
        mario.changeAnimation("run",marioI)
        mario.setCollider("rectangle",0,-30,320,350)
    }
}

if(gamestate === "restart"){
    mario.x = width*0.1
    mario.y = height*0.85
    obsg.destroyEach()
    cloudg.destroyEach()
    hillg.destroyEach()
    bushg.destroyEach()
    cloudg.velocityXEach = -10
    ground.velocityX = 0
    mario.scale =0.35
    mario.changeAnimation("stand",marioI1)
    mario.setCollider("rectangle",0,-60,320,350)
    if(keyDown("space")){
        gamestate = "play"
        mario.scale = 0.25
        mario.changeAnimation("run",marioI)
        mario.setCollider("rectangle",0,-30,320,350)
    }
}

if(gamestate=== "play"){
    ground.velocityX = -10
    cloudg.velocityXEach = ground.velocityX
    if(frameCount%10==0){
        score = score + 1
    }
    if(state === 1){
        mario.scale = 0.25
        mario.changeAnimation("run",marioI)
        mario.setCollider("rectangle",0,-30,320,350)
    }
    if(state === 2){
        mario.scale = 0.75
        mario.changeAnimation("bigrun",marioI2)
        mario.setCollider("rectangle",0,0,100,200)
    }
    if(keyDown("space") && mario.collide(floorg)){
        mario.velocityY = -20
        jump.play()
    }
    if(keyDown("space") && mario.collide(floorg)){
        mario.velocityY = -20
        jump.play()
    }
    if(mario.isTouching(holeg) && lives >= 1 && state===1){
        gamestate = "end"
        death.play()
    }
    if(mario.isTouching(holeg)&& state===2){
        mario.changeAnimation("run",marioI)
        mario.y = height*0.55
        state = 1
        powerdown.play()
    }
    if(mario.isTouching(goombag) && lives > 0){
        death.play()
        gamestate = "end"
    }
    if((mario.isTouching(obsg) ||mario.isTouching(goombag)) && lives <= 0 && state===1){
        gamestate = "die"
        song.stop()
        gameovers.play()
    }
    for(var i = 0; i<goombag.length;i++){
        if(mario.isTouching(goombag.get(i)) && mario.velocityY > 0){
            goombag.get(i).changeAnimation("squash",goombaI2)
            goomba.setCollider("rectangle",0,0,0,0)
            score = score + 100
        }
    }
}

if(gamestate === "end"){
    mario.scale = 0.18
    mario.changeAnimation("die",marioI3)
    mario.velocityY = -8
    lives = lives -1 
    gamestate = "death" 
}

if (gamestate === "death"){
    if (mario.y >= height*1.05){
        gamestate = "restart"
    }
}

if(gamestate==="die"){
    mario.scale = 0.18
    mario.changeAnimation("die",marioI3)
    mario.velocityY = -8
    gamestate = "ded"
} 

if (gamestate === "ded" && mario.y >= height*1.05){
    gamestate = "finish"
}

if(gamestate === "finish"){
    gameover.velocityX = -10
    retry.velocityX = -10
    if (score>highscore){
        highscore = score
    }
    if(gameover.x <= width/2){
        gameover.velocityX = 0
        gamestate = "stop"
        ground.velocityX = 0
        retry.velocityX = 0
    }
}

if(gamestate == "stop"){
    if(mousePressedOver(retry)){
        gamestate = "start"
        obsg.destroyEach()
        cloudg.destroyEach()
        gameover.x = width*2
        retry.x = width*2
        
        score = 0
        lives = 3
        
    }
}

    mario.velocityY = mario.velocityY + 0.8 
    start.depth = mario.depth + 1   

    if(ground.x <= 500){
        ground.x = 920
    }

    if(gamestate==="start" || gamestate==="play" || gamestate==="restart"){
        mario.collide(ground2)
    }
    
    fill("white")
    text("Score: "+score,width*0.01,height*0.03)
    text("Highscore: "+highscore,width*0.01,height*0.06)
    text("Lives: "+lives,width*0.01,height*0.09)

    if(frameCount%190===0){
        holes()
    }
    if(frameCount%150===30){
        goombas()
    }
    if(frameCount%40===0){
        cloud()
    }
    if(frameCount%80===20){
        bushes()
    }
    if(frameCount%120===35){
        hills()
    }
    
    //if(keyDown("up_arrow")){
    //    state = 2
    //}
    //if(keyDown("down_arrow")){
    //    state = 1
    //}
    console.log(gamestate)
    //if(holeg.isTouching(hillg||bushg)){
    //    holeg.destroyEach()
    //}
}


function cloud(){
    clouds = createSprite(width*1.5,random(height*0.2,height*0.5),10,10)
    switch (Math.round(random(1,3))){
        case 1 : clouds.addImage(cloudsI1)
        break;
        case 2 : clouds.addImage(cloudsI2)
        break;
        case 3 : clouds.addImage(cloudsI3)
        break;
    }
    clouds.scale = 0.2
    clouds.lifetime = 800
    cloudg.add(clouds)
    //clouds.debug = true
    mario.depth = clouds.depth +1
}

function bushes(){
    bush = createSprite(width*1.5,height*0.9,10,10)
    if(gamestate==="play"){
        bush.velocityX = ground.velocityX
    }
    switch (Math.round(random(1,3))){
        case 1 : bush.addImage(bush1)
        break;
        case 2 : bush.addImage(bush2)
        break;
        case 3 : bush.addImage(bush3)
        break;
    }
    bush.scale = 0.35
    bush.lifetime = 800
    bushg.add(bush)
    //bush.debug = true
    bush.depth = ground.depth - 1
}


function hills(){
    hill = createSprite(width*1.5,random(height*0.85,height*0.95),10,10)
    if(gamestate==="play"){
        hill.velocityX = ground.velocityX
    }
    hill.addImage(hillI)
    hill.lifetime = 800
    hill.depth = bush.depth - 1
    hill.scale = 0.85
    hillg.add(hill)
}

function holes(){
    hole = createSprite(width*1.5,height*0.965,10,10)
    if(gamestate==="play"){
        hole.velocityX = ground.velocityX
    }
    hole.addImage(holeI)
    hole.lifetime = 300
    hole.depth = mario.depth + 1
    hole.scale = 0.25
    obsg.add(hole)
    holeg.add(hole)
    hole.debug = true
    //hole.setCollider("rectangle",0,0,450,250)
}

function goombas(){
    goomba = createSprite(width*1.5,height*0.85,10,10)
    if(gamestate==="play"){
        goomba.velocityX = ground.velocityX
    }
    goomba.addAnimation("obs",goombaI)
    goomba.addAnimation("squash",goombaI2)
    goomba.lifetime = 800
    goomba.depth = bush.depth - 1
    goomba.scale = 0.25
    goombag.add(goomba)
    goomba.depth = ground.depth + 1
    goomba.debug = true
}
