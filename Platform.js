class Platform 
{
    constructor() {
        platforms = new Group();

        platforms.collider = "static";
        platforms.friction = 0;
        platforms.bounciness = 0;

        new platforms.Sprite(400, 580, 800, 40);

        new platforms.Sprite(300, 400, 150, 20);
        new platforms.Sprite(500, 300, 200, 20);

    }
  }