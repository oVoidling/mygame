var bk_img;
var player,playerImage,playerImageWalk;
var zombie,zombieGroup,zombieImage;
var bullet,bulletImg;
var playerMoving = false;
var score = 0;
var flag = 0;
var bulletGroup;
var flag2 = 0;
var gameState = "PLAY";
var bk_music;
var bulletSound;
var bulletLeft = 10
var invWall;
function preload(){
bk_img = loadImage("./assets/background.jpg");
playerImageWalk = loadAnimation("./assets/gunman1.png","./assets/gunman2.png","./assets/gunman3.png","./assets/gunman4.png","./assets/gunman5.png","./assets/gunman6.png");
playerImage = loadImage("assets/gunman2.png");
zombieImage = loadAnimation("assets/zombie1.png","assets/zombie2.png","assets/zombie3.png","assets/zombie4.png","assets/zombie5.png","assets/zombie6.png","assets/zombie7.png","assets/zombie8.png");
bulletImg = loadImage("assets/bullet.jpg");
bulletSound = loadSound("./assets/bulletSound.mp3");
}

function setup(){
createCanvas(windowWidth,windowHeight);

zombieGroup = new Group();
bulletGroup = new Group();
player = createSprite(width/2 - 800,height/2 + 200)
player.addImage('walk',playerImage);
player.addAnimation('player',playerImageWalk);
invWall = createSprite(width/2 + 1000,height/2 + 200);
invWall.addImage(bulletImg);
invWall.scale = 0.2
invWall.visible = false;

}

function draw(){
background(bk_img)
if(gameState === "PLAY"){
if(playerMoving == false){
    player.changeImage('walk');
}else{
    player.changeAnimation('player');
}
if(keyDown(RIGHT_ARROW)){
    player.position.x += 5;
    playerMoving = true;
    player.mirrorX(1);
    flag2 = 0;
}
if(keyWentUp(RIGHT_ARROW)){
    playerMoving = false;
}
if(keyDown(LEFT_ARROW)){
    player.position.x -= 5;
    playerMoving = true;
    player.mirrorX(-1);
    flag2 = 1;
}
if(keyWentUp(LEFT_ARROW)){
    playerMoving = false;
}
textSize(30);
text("Score: " + score,width/1 - 120,50);
text("Bullets Left: " + bulletLeft,width/1 - 400,50);

if(frameCount % 340 == 0){
    zombie = createSprite(random(900,width),height/2 + 200);
    zombie.addAnimation('zombie',zombieImage);
    zombie.scale = 0.5;
    zombie.mirrorX(-1);
    zombie.velocity.x = -5;
    zombie.lifetime = 40
    zombieGroup.add(zombie);
}

if(flag === 1){
zombieGroup.collide(bulletGroup,removeBlock)
}
zombieGroup.collide(player,colliderplayer)
bulletGroup.collide(invWall,removeBullet)
}

if(gameState === "END"){
    background("black");
    stroke("yellow");
    textSize(30);
    text("Game Over \n Your score is " + score,width/2 - 100, height/2);
    text("Press ENTER To Restart",width/2 - 100, height/2 + 100);
    fill("black");
    if(keyDown(ENTER)){
        resetGame();
    }
    bulletGroup.removeSprites();

}

if(gameState === "WIN"){
    background("black");
    stroke("yellow");
    textSize(30);
    text("You Won!",width/2 - 100, height/2);
    text("Press ENTER To Restart",width/2, 100, height/2 + 100);
    fill("black");
    if(keyDown(ENTER)){
        resetGame();
    }
    bulletGroup.removeSprites();

}

if(score === 10){
    gameState = "WIN";
    player.remove();
}
if(keyDown("r") && bulletLeft <= 1){
    bulletLeft += 10;
    console.log (bulletLeft);
}
drawSprites();
}
function removeBlock(zombie,bullet){
    zombie.remove();
    bullet.remove();
    score += 1;
}
function colliderplayer(zombie,player){
    zombie.remove();
    player.remove();
    gameState = "END";
}
function removeBullet(invWall,bullet){
    bullet.remove();
    invWall.visible = false;
}
function keyPressed(){
if(keyCode == 32 && bulletLeft > 0){
    bullet = createSprite(player.position.x + 100,player.position.y - 40);
    bullet.addImage(bulletImg);
    bullet.scale = 0.03;
    if(flag2 === 1){
    bullet.velocity.x = -4;
    bullet.mirrorX(-1);
    }else{
    bullet.velocity.x = 4;
    bullet.mirrorX(1);
    }
bullet.lifetime = 1;
    flag = 1;
    bulletSound.play()
    bulletSound.setVolume(2)
    bulletLeft -= 1;
    bulletGroup.add(bullet);
}
}
function resetGame(){
    gameState = "PLAY";
    score = 0;
    bulletLeft = 10;
    background(bk_img);
    player = createSprite(width/2 - 800,height/2 + 200)
    player.addImage('walk',playerImage);
    player.addAnimation('player',playerImageWalk);
}