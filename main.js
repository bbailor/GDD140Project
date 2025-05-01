let playerSheet;

function preload()
{
    playerSheet = loadImage('assets/spriteSheet.png');
}

function setup()
{
    new Canvas(800, 600);
    game = new Game();
    world.gravity.y = 10;
}

function draw()
{
    background(135, 206, 235);
    game.update();
}