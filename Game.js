let platforms;
let p;

class Game {
    constructor() {
      
      this.p = new Platform();
      this.player = new Player(100, 100);

  


      //this.Collider = new Colliders(platforms);
      
    }
  
    update() {
      this.player.update(this.platforms);
      //this.platform.update();
    }
  }
  