import Phaser from 'phaser';

export default class Arrow extends Phaser.GameObjects.Sprite {

  constructor(scene, x, y, item = 0) {
    super(scene, x, y);
    this.setItemType(item);
    this.setPosition(x, y);
    scene.physics.add.existing(this);
    this.body.allowGravity = false;
    this.body.setSize(27, 4);
    this.setScale(2);
    this.angle = -45;

    scene.add.existing(this);
  }

  setItemType(textureIdx) {
    this.setTexture("items", textureIdx);
  }

  preUpdate (time, delta) {
    super.preUpdate(time, delta);

    const speed = -280;
    const prevVelocity = this.body.velocity.clone();

    // Stop any previous movement from the last frame
    this.body.setVelocity(0);
    this.body.setVelocityX(speed);

  }
}

