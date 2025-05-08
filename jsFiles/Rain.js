class Rain
{
    constructor()
    {
        this.sprite = new Sprite(random(0 + 30, width - 30), -500 + camera.y);
        this.sprite.image = raindrop;
        this.sprite.removeColliders();
        this.sprite.addCollider(0, -0.1, 4, 6);
        this.sprite.scale = 4;
        this.sprite.collider = 'none';
        this.sprite.vel.y = 1.5;
        this.acceleration = random(0.01, 0.25);
    }

    update()
    {
        this.sprite.vel.y += this.acceleration;


    }
}