let direction;
let jumping;

class Player
{
    constructor(x, y)
    {
        this.sprite = new Sprite(x, y, 32, 33);

        //sprite.setCollider('rectangle', offsetX, offsetY, width, height);
        //this.sprite.setCollider('rectangle', 0, 0, 32, 12);

        this.sprite.color = 'orange';
        this.sprite.bounciness = 0;


        this.loadAnimations();
        this.sprite.width = 20;
        this.sprite.height = 12;
        this.sprite.removeColliders();
        this.sprite.addCollider(0, 8, 16, 12);
        this.sprite.scale = 2;




        this.direction = 1;
        this.jumping = false;

        this.sprite.debug = true;
    }

    loadAnimations()
    {
        displayMode('normal', 'pixelated');

        this.sprite.spriteSheet = playerSheet;
        this.sprite.anis.frameDelay = 8;

        this.sprite.addAnis({
            idle: { row: 1, frames: 4},
            jump: { row: 8, frames: 7, delay: 16},
            run: { row: 4, frames: 8}
        })

        this.sprite.changeAni('idle');
    }

    update()
    {
        this.sprite.rotation = 0;

        if(direction == 1)
        {
            this.sprite.mirror.x = false;
        }
        else
        {
            this.sprite.mirror.x = true;

        }

        if(this.sprite.vel.y != 0)
        {
            this.sprite.changeAni('jump');
        }

        if (kb.pressing('left')) 
        {
            direction = -1;
            this.run()
        } 
        if (kb.pressing('right')) 
        {
            direction = 1;
            this.run()
        }  
        if (!kb.pressing('left') && !kb.pressing('right'))
        {
            this.sprite.vel.x = 0;
            this.idle();
        }

        if(kb.presses('space'))
        {
            this.jump();
        }

        for (let platform of platforms)
        {
            if(this.sprite.collides(platform))
            {
                this.jumping = false;
            }
        }
    }

    run()
    {
         //temporary jumping implementation- add jumpning instance var.
        if(!this.jumping)
        {
            this.sprite.changeAni('run');
        }

        this.sprite.removeColliders();
        this.sprite.addCollider(0, 12, 32, 24);

        this.sprite.vel.x = 5 * direction;
    }

    idle()
    {
        if (!this.jumping)
        {
            this.sprite.removeColliders();
            this.sprite.addCollider(0, 16, 32, 24);
            this.sprite.changeAni('idle');
        }

    }

    jump()
    {
        this.jumping = true;
        this.sprite.changeAni('jump');

        this.sprite.removeColliders();
        this.sprite.addCollider(0, -2, 32, 24);
        
        this.sprite.vel.y = -9;
    }
}