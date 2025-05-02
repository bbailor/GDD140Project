let platforms;
let p;
let c;

class Game {
    constructor() {

      this.p = new Platform();
      this.c = new Colliders();

      this.player = new Player(100, 550);
    }
  
    update() {
      this.player.update(this.platforms);
      //this.platform.update();
    }
  }
  