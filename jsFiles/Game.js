let platforms;
let walls;
let p;
let c;
let w;
let r;
let camScrollSpeed;
let raindrops;

class Game {
  constructor() {
    p = new Platform();
    c = new Colliders();
    w = new Water();

    this.rainTimer = 0;
    this.rainIntensity = 0.5; 
    this.maxDrops = 2;
    this.spawnRate = 1000;
    this.rainChangeTimer = 10000;
    this.speedIncreaseTimer = 30000;

    textSize(30);


    raindrops = [];
    camScrollSpeed = 1.5;


    this.player = new Player(width / 2, 510);
  }

  update() 
  {
    this.player.update(this.platforms);
    p.update();
    c.update();
    w.update();

    for (r of raindrops) 
    {
      r.update();
    }

    this.speedIncreaseTimer -= deltaTime;
    if (this.speedIncreaseTimer <= 0) 
      {
      this.speedIncreaseTimer = 10000;
      if (camScrollSpeed < 2.2) camScrollSpeed += 0.1;
    }

    this.rainChangeTimer -= deltaTime;
    if (this.rainChangeTimer <= 0) 
      {
      this.rainChangeTimer = 20000;

      let temp = Math.floor(random(0, 3));
      if (temp === 1) 
        {
        if (this.rainIntensity < 0.6) 
          {
          this.rainIntensity += 0.05;
        }
      } else if (temp === 2) 
        {
        if (this.maxDrops < 5) 
          {
          this.maxDrops += 0.34;
        }
      }
       else 
      {
        if (this.spawnRate > 500) 
        {
          this.spawnRate -= 100;
        }
      }
    }

    this.rainTimer -= deltaTime;
    if (this.rainTimer <= 0) {
      let baseInterval = this.spawnRate;
      let nextInterval = baseInterval * (1.0 - this.rainIntensity + 0.1);
      this.rainTimer = random(nextInterval * 0.7, nextInterval * 1.3);

      let dropsToSpawn = floor(map(this.rainIntensity, 0, 1, 0, this.maxDrops));
      for (let i = 0; i < dropsToSpawn; i++) 
      {
        raindrops.push(new Rain());
      }
    }
  }
}
