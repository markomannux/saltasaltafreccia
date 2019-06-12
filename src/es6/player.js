export default class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, type = 'king') {
    super(scene, x, y);

    this.type = type;
    this.scene = scene;
    this.setPosition(x, y);
    this.setSize(22, 33);

    scene.add.existing(this);
    const texture = type === 'snake'? 69 : 23;
    this.setTexture('player-spritesheet', texture);
  }

  setType(type) {
    this.type = type;
  }

  playWalk() {
    this.anims.play(`${this.type}-walk`);
  }

  playJump() {
    this.anims.play(`${this.type}-jump`);
  }
}
