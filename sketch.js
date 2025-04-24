let player;
let platforms;
let jumpablePlatforms;
let goal;
let jumpThresholdBefore;
let jumpThresholdAfter;
let tryJump;
let canJump;
let walls;

function setup() {
  new Canvas(800, 400);
  world.gravity.y = 20;

  // Player setup
  player = new Sprite(100, 300, 40, 40);
  player.color = 'rgb(13,113,211)';
  player.bounciness = 0;
  player.friction = 0.1;

  // Ground and platforms
  platforms = new Group();
  jumpablePlatforms = new Group();
  platforms.collider = 'static';
  platforms.color = 'green';
  platforms.friction = 0;

  // Ground
  new platforms.Sprite(400, 390, 1600, 40); // long ground

  for (let i = 0; i < 30; i++)
  {
    new platforms.Sprite(random(100, 1000), 300 - (i * 110), 100, 20);
    new platforms.Sprite(random(100, 1000), 300 - (i * 110), 100, 20);
    new platforms.Sprite(random(100, 1000), 300 - (i * 110), 100, 20);
  }

  jumpablePlatforms.color = "red";
  jumpablePlatforms.collider = "none";

  for (let platform of platforms)
  {
    new jumpablePlatforms.Sprite(platform.x, platform.y - ((platform.h) / 2), platform.w - 2, platform.h - (platform.h - 2))
  }


  walls = new Group();
  leftWall = new walls.Sprite(0, 10, 20, 3000);
  rightWall = new walls.Sprite(1000, 10, 20, 3000);

  walls.color = "green";
  walls.collider = "static";
  walls.friction = 0;

  leftWallCollider = new jumpablePlatforms.Sprite(leftWall.x + (leftWall.w / 2), leftWall.y, leftWall.w - (leftWall.w - 2), leftWall.h);
  rightWallCollider = new jumpablePlatforms.Sprite(rightWall.x - (rightWall.w / 2), rightWall.y, rightWall.w - (rightWall.w - 2), rightWall.h);



  // Goal
  goal = new Sprite(1450, 150, 40, 60);
  goal.color = 'gold';
}

function draw() {
  background(135, 206, 235); // sky blue

  // Camera follows player
  camera.x = player.x;
  camera.y = player.y - 100;

  //lock rotation
  player.rotation = 0;


  jumpThresholdAfter += deltaTime;
  jumpThresholdBefore -= deltaTime;

  // Player movement
  if (kb.pressing('left')) {
    player.vel.x = -5;
  } 
  if (kb.pressing('right')) {
    player.vel.x = 5;
  }  
  if (!kb.pressing('left') && !kb.pressing('right')){
    player.vel.x = 0;
  }

  if (player.overlapping(jumpablePlatforms))
  {
    jumpThresholdAfter = 0;
  }

  // Jump if on ground or platform
  if (kb.presses('space')){
    tryJump = true;
    jumpThresholdBefore = 100;
    
    if(jumpThresholdAfter < 150)
    {
      player.vel.y = -10;
      tryJump = false;
    }
  }

  if (tryJump && player.overlapping(jumpablePlatforms) && jumpThresholdBefore > 0)
  {
    player.vel.y = -10;
    tryJump = false;
  }







  if (player.overlapping(jumpablePlatforms))
    {
      player.color = "red";
    }
  else{
    player.color = "blue"
  }






  // Win condition
  if (player.overlapping(goal)) {
    fill('black');
    textSize(32);
    textAlign(CENTER, CENTER);
    text("🎉 You reached the goal! 🎉", player.x, 100);
    noLoop(); // Stop the game
  }
}
