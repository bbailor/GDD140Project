let colliders;

class Colliders
{
    constructor()
    {
        colliders = new Group();
        colliders.debug = true;
        colliders.collider = 'static';
        colliders.bounciness = 0;

        for (let platform of platforms)
        {
            new colliders.Sprite(platform.x, platform.y - ((platform.h) / 2), platform.w - 2, platform.h - (platform.h - 2))
        }
    }
}