import Phaser from 'phaser';

import Player from './player.js';
import Arrow from './arrow.js';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({key: 'game_scene'});
    this.BASE_EMITTING_INTERVAL = 1000;
  }

  init(data) {
    this.data = data;
  }

  preload() {
  }

  create() {
    const self = this;
    const TILE_SIZE = 72;
    this.lastEmit = 0;
    this.nextEmit = this.BASE_EMITTING_INTERVAL;

    this.platforms = this.physics.add.staticGroup();
    this.arrowPool = this.add.group();
    this.arrowPool.classType = Arrow;

    for (let i = 0; i<9; i++) {
      this.platforms.create(TILE_SIZE/2 + TILE_SIZE*i, 375, 'ground');
    }

    this.player = new Player(this, 120, 239, this.data.player);
    this.player.setScale(2);
    this.physics.add.existing(this.player);
    this.player.body.setSize(25, 30);
    this.player.body.offset.x = 22;
    this.player.body.offset.y = 33;

    this.physics.add.collider(this.player, this.platforms);

    this.physics.add.overlap(this.player,
        this.arrowPool,
        this.collideWithArrow,
        null,
        this);

    this.add.zone(0, 0, 600, 400).setOrigin(0).setName('Tap').setInteractive();
    this.input.on('gameobjectdown', this.onTap, this);
  }

  collideWithArrow() {
    this.scene.start('start_scene');
  }

  onTap(pointer, gameObject) {
    if (gameObject.name === 'Tap') {
      if (this.player.body.touching.down) {
        this.player.body.setVelocityY(-490);
        this.player.playJump();
      }
    }
  }

  update(time, delta) {
    if (time > 1000 && time - this.lastEmit > this.BASE_EMITTING_INTERVAL) {
      const vPos = 275 + Math.floor(Math.random()*50);
      const arrow = this.arrowPool.getFirstDead(true, 600, vPos);
      this.add.existing(arrow);
      arrow.setScale(2);

      this.physics.add.existing(arrow);
      arrow.body.allowGravity = false;
      arrow.body.setSize(30, 10);
      arrow.angle = -45;

      this.lastEmit = time;
      this.nextEmit = this.BASE_EMITTING_INTERVAL + Math.floor(Math.random()*500);
    }
  }
}
