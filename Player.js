let direction;
let jumping;

let coyoteTime;
let jumpBuffer;
let tryJump;
let canJump;

const JUMP_BUFFER_TIME = 100;
const COYOTE_TIME = 100;

class Player
{
    constructor(x, y)
    {
        this.sprite = new Sprite(x, y, 32, 33);

        this.loadAnimations();
        this.sprite.width = 20;
        this.sprite.height = 12;

        this.sprite.scale = 2;
        this.sprite.removeColliders();
        this.sprite.addCollider(0, 12, 32, 24);
        this.sprite.collider = 'dynamic';
        this.sprite.bounciness = 0;

        this.direction = 1;
        this.jumping = false;
        this.tryJump = false;
        this.coyoteTime = 0;
        this.jumpBuffer = 0;

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

        this.coyoteTime += deltaTime;
        this.jumpBuffer -= deltaTime;

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
            this.tryJump = true;
            this.jumpBuffer = JUMP_BUFFER_TIME;

            if(this.sprite.colliding(colliders) || this.coyoteTime < COYOTE_TIME)
            {
                this.jump();
            }
        }

        // if(tryJump && this.jumpBuffer < JUMP_BUFFER_TIME)
        // {
        //     this.jump();
        // }

        if(this.jumping)
        {
            this.sprite.ani.offset.y = 4;

            if(this.sprite.ani.frame == 3)
            {
                this.sprite.ani.loop = false;
                this.sprite.ani.playing = false;
            }
        }

        //clamp downard bounce after landing
        // if (this.sprite.vel.y > 0 && this.sprite.colliding(colliders)) 
        // {
        //     this.sprite.vel.y = 0;
        // }

        if(this.sprite.vel.y > 2)
        {
            this.sprite.ani.offset.y = 4;
            this.sprite.changeAni('jump');
            this.sprite.ani.frame = 3;
        }

        // if(this.sprite.vel.y < -3 && !jumping)
        // {
        //     this.sprite.ani.offset.y = 4;
        //     this.sprite.changeAni('jump');
        // }

        if(this.sprite.collides(colliders))
        {
            this.jumping = false;

            if(this.tryJump && this.jumpBuffer < JUMP_BUFFER_TIME)
            {
                this.jump();
            }
        }   

        if(this.sprite.colliding(colliders))
        {
            this.coyoteTime = 0;
        }
    }

    run()
    {
        if(!this.jumping)
        {
            this.sprite.ani.offset.y = 1;

            if(this.sprite.colliding(colliders))
            {
                this.sprite.changeAni('run');
            }
        }

        this.sprite.vel.x = 5 * direction;
    }

    idle()
    {
        if (!this.jumping)
        {
            if(this.sprite.colliding(colliders))
            {
                this.sprite.ani.offset.y = -2;
                this.sprite.changeAni('idle');
            }
        }
    }

    jump()
    {
        //if ((tryJump && this.sprite.colliding(colliders) && jumpBuffer > 0) || coyoteTime < 150)
        {
            this.coyoteTime = 0;
            this.jumpBuffer = 0;

            this.jumping = true;
            this.sprite.changeAni('jump');
    
            this.sprite.ani.frame = 1;
            this.sprite.ani.playing = true;
            this.sprite.ani.loop = true; 

            this.sprite.vel.y = -8;
            this.tryJump = false;
        }

    }
}