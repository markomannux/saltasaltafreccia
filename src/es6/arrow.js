import Phaser from 'phaser';

export default class Arrow extends Phaser.GameObjects.Sprite {

  constructor(scene, x, y, item = 0) {
    super(scene, x, y);
    this.setItemType(item);

    this.setPosition(x, y);

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

