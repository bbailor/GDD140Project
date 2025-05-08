let direction;
let jumping;

let coyoteTime;
let jumpBuffer;
let tryJump;
let canJump;
let canWallJump;

let startForce;
let forceLength;
let horizontalForce;
let forceStrength;

let startWait;
let gameOver;

const JUMP_BUFFER_TIME = 150;
const COYOTE_TIME = 150;

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
        this.startForce = 0;
        startWait = 0;

        this.maxSpeed = 5;
        this.acceleration = 0.8;
        this.friction = 0.85;

        //this.sprite.debug = true;
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
        this.startForce += deltaTime;
        startWait += deltaTime;


        if (this.horizontalForce) {
            if (this.startForce < this.forceLength) {
                let forceRatio = 1 - this.startForce / this.forceLength;
                this.sprite.vel.x += this.forceStrength * forceRatio * 0.2;
            } else {
                this.horizontalForce = false;
            }
        }


        if(startWait > 3000)    camera.y -= camScrollSpeed; 


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
            if(!this.horizontalForce) this.sprite.vel.x = 0;
            this.idle();
        }

        if(kb.presses('left') || kb.presses('right'))
        {
            if(!this.horizontalForce) this.sprite.vel.x = 0;
        }

        if(kb.presses('space'))
        {
            this.tryJump = true;
            this.jumpBuffer = JUMP_BUFFER_TIME;

            
            if(this.sprite.colliding(colliders) || this.coyoteTime < COYOTE_TIME)
            {
                this.canWallJump = true;
                this.jump();
            }
            else if((this.sprite.colliding(wallColliders) || this.coyoteTime < COYOTE_TIME) && this.canWallJump)
            {
                this.wallJump();
            }
        }

        for (let r of raindrops)
        {
            if (r.sprite.overlaps(this.sprite)) 
            {
                this.applyForce();
            }
          }



        if(this.sprite.overlaps(waterGroup))
        {
            gameOver = true;

            textSize(12);
            fill('black');
            text("blub blub", this.sprite.x, this.sprite.y + 340 - camera.y)

            noLoop();

        }



        if(this.jumping)
        {
            this.sprite.ani.offset.y = 4;

            if(this.sprite.ani.frame == 3)
            {
                this.sprite.ani.loop = false;
                this.sprite.ani.playing = false;
            }
        }

        if(this.sprite.vel.y > 2)
        {
            this.sprite.ani.offset.y = 4;
            this.sprite.changeAni('jump');
            this.sprite.ani.frame = 3;
        }


        if(this.sprite.collides(colliders))
        {
            this.jumping = false;

            if(this.tryJump && (this.jumpBuffer > 0))
            {
                this.jump();
            }
        }   
        else if(this.sprite.collides(wallColliders))
        {
            this.jumping = false;

            if(this.tryJump && (this.jumpBuffer > 0) && this.canWallJump)
            {
                this.wallJump();
            }
        }

        if(this.sprite.colliding(colliders))
        {
            this.coyoteTime = 0;
        }


        if (this.sprite.y < camera.y - height / 2 + 100)
        {
            const threshold = camera.y - height / 2 + 100;
            const distance = threshold - this.sprite.y;
        
            const lerpFactor = 0.05;
            const targetCameraY = camera.y - distance * lerpFactor;
        
            if (distance > 0) {
                camera.y = Math.max(targetCameraY, camera.y - 3);
            }
        }
    }

    // run()
    // {
    //     if(!this.jumping)
    //     {
    //         this.sprite.ani.offset.y = 1;

    //         if(this.sprite.colliding(colliders))
    //         {
    //             this.sprite.changeAni('run');
    //         }
    //     }

    //     this.sprite.vel.x = 5 * direction;
    // }

    run() {
        if(!this.jumping) {
            this.sprite.ani.offset.y = 1;
    
            if(this.sprite.colliding(colliders)) {
                this.sprite.changeAni('run');
            }
        }
    
        // Apply acceleration instead of setting velocity directly
        this.sprite.vel.x += this.acceleration * direction;
        
        // Cap the maximum speed
        if (Math.abs(this.sprite.vel.x) > this.maxSpeed) {
            this.sprite.vel.x = this.maxSpeed * Math.sign(this.sprite.vel.x);
        }
    }

    // idle()
    // {
    //     if (!this.jumping)
    //     {
    //         if(this.sprite.colliding(colliders))
    //         {
    //             this.sprite.ani.offset.y = -2;
    //             this.sprite.changeAni('idle');
    //         }
    //     }
    // }

    idle() {
        if (!this.jumping) {
            if(this.sprite.colliding(colliders)) {
                this.sprite.ani.offset.y = -2;
                this.sprite.changeAni('idle');
            }
        }
        

        this.sprite.vel.x *= this.friction;
    }

    jump()
    {
        jumpSound.setVolume(0.3);
        jumpSound.play();

        //if ((tryJump && this.sprite.colliding(colliders) && jumpBuffer > 0) || coyoteTime < 150)
        {
            this.coyoteTime = 0;
            this.jumpBuffer = 0;

            this.jumping = true;
            this.sprite.changeAni('jump');
    
            this.sprite.ani.frame = 1;
            this.sprite.ani.playing = true;
            this.sprite.ani.loop = true; 

            this.sprite.vel.y = -7.8;
            this.tryJump = false;
        }

    }

    wallJump()
    {
        this.canWallJump = false;
        //if ((tryJump && this.sprite.colliding(colliders) && jumpBuffer > 0) || coyoteTime < 150)
        {
            this.coyoteTime = 0;
            this.jumpBuffer = 0;

            this.jumping = true;
            this.sprite.changeAni('jump');
    
            this.sprite.ani.frame = 1;
            this.sprite.ani.playing = true;
            this.sprite.ani.loop = true; 

            this.sprite.vel.y = -7;
            this.tryJump = false;
        }

    }

    applyForce()
    {
        this.forceLength = 500;
        this.startForce = 0;
        this.horizontalForce = true;
    
        this.forceStrength = -direction * random(4, 16);
        this.sprite.vel.y -= random(0.4,1);
    }
}