class Platform 
{
    constructor() {
        platforms = new Group();

        platforms.collider = "static";

        new platforms.Sprite(400, 580, 800, 40);

        new platforms.Sprite(300, 400, 150, 20);
        new platforms.Sprite(500, 300, 200, 20);

        // for(let platform of this.platforms)
        // {
        //     print(platform);
        // }
    }
  }