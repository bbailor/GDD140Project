let colliders;
let wallColliders;

let leftWallCollider;
let rightWallCollider;

class Colliders
{
    constructor()
    {
        colliders = new Group();
        colliders.collider = 'static';
        colliders.bounciness = 0;
        colliders.friction = 0;
        colliders.visible = false;


        wallColliders = new Group()
        wallColliders.collider = 'kin';
        wallColliders.bounciness = 0;
        wallColliders.friction = 0;

        for (let platform of platforms)
        {
            new colliders.Sprite(platform.x, platform.y - ((platform.h) / 2), platform.w - 2, platform.h - (platform.h - 2))
        }

        //left wall
        leftWallCollider = new wallColliders.Sprite(leftWall.x + (leftWall.w / 2), leftWall.y, leftWall.w - (leftWall.w - 2), leftWall.h);
        //right wall
        rightWallCollider = new wallColliders.Sprite(rightWall.x - (rightWall.w / 2), rightWall.y, rightWall.w - (rightWall.w - 2), rightWall.h);
    }

    update()
    {
        leftWallCollider.y = camera.y;
        rightWallCollider.y = camera.y;


        for (let collider of colliders)
        {
            if(camera.y < collider.y - 600)
            {
                collider.remove();
            }
        }

        for (let collider of wallColliders)
        {
            if(camera.y < collider.y - 600)
            {
                collider.remove();
            }
        }
    }

    updateColliders(platform, vertical)
    {
        {
            if(!vertical) 
            {
                new colliders.Sprite(platform.x, platform.y - ((platform.h) / 2), platform.w - 2, platform.h - (platform.h - 2))
            }
            else
            {
                new colliders.Sprite(platform.x - (platform.w / 2), platform.y, platform.w - (platform.w - 2), platform.h)
                new colliders.Sprite(platform.x + (platform.w / 2), platform.y, platform.w - (platform.w - 2), platform.h);
            }
        }
    }
}