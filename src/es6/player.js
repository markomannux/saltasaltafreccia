export default class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y);
    
        this.scene = scene;
        const anims = scene.anims;
        anims.create({
          key: "player-walk",
          frames: anims.generateFrameNumbers("player-spritesheet", { start: 69, end: 72 }),
          frameRate: 8,
          repeat: -1
        });
    
        this.setTexture("player-spritesheet", 0);
        this.setPosition(x, y);
        this.setSize(22, 33);
    
        /*scene.physics.add.existing(this)
        this.body.offset.x = 23;
        this.body.offset.y = 27;
    */
        scene.add.existing(this);
    
        this.anims.play("player-walk");
      }

}