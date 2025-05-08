let waterTiles = [];
let waterGroup;

//used a lot of stackoverflow and reddit for water physics/animation- can go back to cite if needed

class Water 
{
  constructor() {
    waterGroup = new Group();
    waterGroup.layer = 100;

    let waterFrames = {
      water: { row: 0, frames: 13, frameSize: [16, 16] }
    };

    let tileWidth = 16;
    let tileHeight = 16;
    let waterHeight = 40;

    let numCols = Math.ceil(1000 / (tileWidth * 2)) + 3; 
    let numRows = Math.ceil(waterHeight / tileHeight) + 1;

    for (let row = 0; row < numRows; row++) 
        {
      for (let col = 0; col < numCols; col++) 
        {
        let x = col * tileWidth * 2 + tileWidth;
        let y = 300 + row * tileHeight * 2 + tileHeight;

        let tile = new waterGroup.Sprite(x, y, tileWidth, tileHeight);

        tile.scale = 4;

        tile.spriteSheet = waterSheet;
        tile.addAnis(waterFrames);
        tile.changeAni('water');

        tile.anis.frameDelay = 6;
        tile.anis.water.frame = (col + row * 2) % 13;
        tile.ani.offset.y = -6;

        tile.collider = 'none';

        tile._initialY = tile.y;
        tile._colIndex = col;
        tile._isTopLayer = (row == 0); // wave layer

        waterTiles.push(tile);
      }
    }
  }

  update() 
  {
    let scrollSpeed = 0.2;
  
    for (let tile of waterTiles) {
      tile.x -= scrollSpeed;
  
      if (tile.x < -16 * tile.scale) {
        tile.x += (Math.ceil(1000 / 16) + 2) * 16;
      }
  
      let amplitude = 4;
      let speed = 2.2;
      let wave = sin((tile.x + frameCount * 2) * speed) * amplitude;
  
      let finalY = tile._initialY + wave + amplitude + 1 + camera.y;
  
      if (startWait < 3000) {
        let progress = startWait / 3000;
        let startY = finalY + 60; 
        tile.y = lerp(startY, finalY, progress);
      } else {
        tile.y = finalY;
      }
    }
  }
  
  
}

