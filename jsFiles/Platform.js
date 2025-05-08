let leftWall;
let rightWall;
let currentPlatforms;
let rows;


class Platform 
{
    constructor(c) 
    {
        walls = new Group();

        this.c = c;

        walls.collider = "kin";
        walls.friction = 2;
        walls.bounciness = 0;

        leftWall = new walls.Sprite(15, 400, 30, 800);
        rightWall = new walls.Sprite(985, 400, 30, 800);

        platforms = new Group();

        platforms.collider = "static";
        platforms.friction = 0;
        platforms.bounciness = 0;
        platforms.layer = 0;

        currentPlatforms = new platforms.Group();
        this.rows = 1;

        this.spawnPlatform(width / 2, 150, 200, 20, false);

        for(let i = 0; i < 5; i++) this.newPlatforms();
    }

    update()
    {
        leftWall.y = camera.y;
        rightWall.y = camera.y;


        //starts at 350
        //print(camera.y)

        for (let platform of platforms)
        {
            if(camera.y < platform.y - 500)
            {
                platform.remove();
                this.newPlatforms();
            }
        }
    }

    findNonOverlappingPosition(platformWidth, generatedPlatforms) 
    {
        let platformX;
        let overlap;
        let maxAttempts = 20;
        let attempts = 0;
        
        do {
            overlap = false;
            platformX = random(30 + platformWidth / 2, width - 30 - platformWidth / 2);
            
            if (generatedPlatforms.length > 0) {
                for (let existingPlatform of generatedPlatforms) {
                    let minDistance = (platformWidth + existingPlatform.width) / 2;
                    
                    if (Math.abs(platformX - existingPlatform.x) < minDistance) {
                        overlap = true;
                        break;
                    }
                }
            }
            
            attempts++;
        } while (overlap && attempts < maxAttempts);
        
        return platformX;
    }
    
    newPlatforms()
    {
        let vertical = Math.random(0,6) < 0.2;
        let numPlatforms = Math.floor(Math.random() * 3) + 1;
        let platformWidth;
        this.rows++;
        
        let generatedPlatforms = [];

        if(this.rows < 10)
        {
            vertical = false;
        }

        if(vertical)
        {  
            for(let i = 0; i < 3; i++)
            {
                platformWidth = 20;
                let platformX = random(30 + platformWidth / 2, width - 30 - platformWidth / 2);
                let platform = this.spawnPlatform(platformX, 150, platformWidth, 100, true);
                generatedPlatforms.push(platform);
            }

        }
        else
        {
            if (numPlatforms == 1)
            {
                platformWidth = 300;
                let platformX = random(30 + platformWidth / 2, width - 30 - platformWidth / 2);
                let platform = this.spawnPlatform(platformX, 150, platformWidth, 20, false);
                generatedPlatforms.push(platform);
            }
            else if (numPlatforms == 2)
            {
                platformWidth = 150;
                
                for (let i = 0; i < 2; i++)
                {
                    let platformX = this.findNonOverlappingPosition(platformWidth, generatedPlatforms);
                    
                    let platform = this.spawnPlatform(platformX, 150, platformWidth, 20, false);
                    generatedPlatforms.push(platform);
                }
            }
            else // numPlatforms == 3
            {
                platformWidth = 100;
                
                for (let i = 0; i < 3; i++)
                {
                    let platformX = this.findNonOverlappingPosition(platformWidth, generatedPlatforms);
                    
                    let platform = this.spawnPlatform(platformX, 150, platformWidth, 20, false);
                    generatedPlatforms.push(platform);
                }
            }
        }
    }

    spawnPlatform(x, y, w, h, vertical)
    {
        let platform = new currentPlatforms.Sprite(x, 700 - (y * this.rows), w, h);
        if(this.rows >= 7)
        {
            c.updateColliders(platform, vertical);
        }
        return platform;
    }
}