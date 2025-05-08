let playerSheet;
let waterSheet;
let raindrop;
let jumpSound;
let backgroundMusic;
let backgroundScroll = 0;
let bg1;
let bg2;
let bg3;
let bg4;
let backgroundRain = [];


let formattedTime;

/**
 * Rain Drop: https://phdev2024.itch.io/water-droplet-32x32
 * 
 * Water tiles/animation: https://rapidpunches.itch.io/freshwater
 * 
 * Sprite Sheet: https://elthen.itch.io/2d-pixel-art-cat-sprites
 * 
 * Background https://free-game-assets.itch.io/free-sky-with-clouds-background-pixel-art-set
 * 
 * music: https://ilyas-ananas.itch.io/background-music?download
 */
function preload()
{
    playerSheet = loadImage('assets/spriteSheet.png');
    waterSheet = loadImage('assets/water.png')
    raindrop = loadImage('assets/rainDrop.png');
    jumpSound = loadSound('assets/jump.mp3')
    backgroundMusic = loadSound('assets/backgroundMusic.mp3');

    bg1 = loadImage('assets/background/1.png'); // farthest
    bg2 = loadImage('assets/background/2.png');
    bg3 = loadImage('assets/background/3.png');
    bg4 = loadImage('assets/background/4.png'); // closest
}

function setup()
{
    new Canvas(1000, 700);
    game = new Game();
    world.gravity.y = 10;
    frameRate(60);
    //backgroundMusic.play();
    backgroundMusic.setVolume(1);

    for (let i = 0; i < 100; i++) 
        {
        backgroundRain.push({
          x: random(width),
          y: random(-height, 0),
          len: random(10, 20),
          speed: random(2, 4)
        });
      }
}

function draw()
 {
    background(135, 206, 235);
  
    backgroundScroll += 1;
    drawParallaxBackground();
    drawBackgroundRain();

    game.update();

    let totalSeconds = floor(millis() / 1000);
    let minutes = floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    formattedTime = nf(minutes, 2) + ":" + nf(seconds, 2);

    if(gameOver)
    {
        textAlign('center')
        fill('red');
        textSize(60);
        text("You Fell!", width / 2, height / 2 - 40)
        textSize(30);
        text("Time Survived: " + formattedTime, width / 2, height / 2);
    }
    textAlign('left');
    fill(255);
    textSize(30);
    text("Time Survived: " + formattedTime, 50, 50);
}

function drawTiledLayer(img, speed) 
{
    let offset = -backgroundScroll * speed % width;
    image(img, offset, 0, width, height);
    image(img, offset + width, 0, width, height);
  }

function drawParallaxBackground() 
{
    drawTiledLayer(bg1, 0.1);
    drawTiledLayer(bg2, 0.2);
    drawTiledLayer(bg3, 0.4);
    drawTiledLayer(bg4, 0.6);
}

function drawBackgroundRain() {
    stroke(255, 255, 255, 80);
    strokeWeight(1.2);
    for (let drop of backgroundRain) {
      line(drop.x, drop.y, drop.x, drop.y + drop.len);
      drop.y += drop.speed;
      if (drop.y > height) {
        drop.y = random(-50, 0);
        drop.x = random(width);
      }
    }
    noStroke();
  }

  function keyPressed() {
    if (!backgroundMusic.isPlaying()) {
      backgroundMusic.play();
    }
  }