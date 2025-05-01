let direction;
let jumping;

class Player
{
    constructor(x, y)
    {
        this.sprite = new Sprite(x, y, 32, 33);


        this.sprite.color = 'orange';
        this.sprite.bounciness = 0;


        this.loadAnimations();
        this.sprite.width = 20;
        this.sprite.height = 12;

        this.sprite.scale = 2;
        this.sprite.removeColliders();
        this.sprite.addCollider(0, 12, 32, 24);

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
            jump: { row: 8, frames: 5, delay: 20},
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

        if(this.jumping)
        {
            print(this.sprite.ani.frame);
            if(this.sprite.ani.frame == 3)
            {
                this.sprite.ani.loop = false;
                this.sprite.ani.playing = false;
            }
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
        if(!this.jumping)
        {
            this.sprite.ani.offset.y = 1;
            this.sprite.changeAni('run');
        }

        this.sprite.vel.x = 5 * direction;
    }

    idle()
    {
        if (!this.jumping)
        {
            this.sprite.ani.offset.y = -2;
            this.sprite.changeAni('idle');
        }
    }

    jump()
    {
        this.jumping = true;
        this.sprite.changeAni('jump');

        this.sprite.ani.frame = 1;         // start at first frame
        this.sprite.ani.playing = true;    // ensure it's playing
        this.sprite.ani.loop = true;       // allow it to play once
        
        this.sprite.vel.y = -8;
    }
}