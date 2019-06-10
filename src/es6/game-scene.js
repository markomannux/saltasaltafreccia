import Phaser from 'phaser';

import Player from './player.js';
import Arrow from './arrow.js';

import GroundImage from '../assets/spritesheets/ground.png';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({key: 'game_scene'});
    this.EMITTING_INTERVAL = 1000;
  }

  preload() {
    this.load.image('ground', GroundImage);
  }

  create() {
    const TILE_SIZE = 72;
    this.lastEmit = 0;

    this.platforms = this.physics.add.staticGroup();
    this.arrowPool = this.add.group();
    this.arrowPool.classType = Arrow;

    for (let i = 0; i<9; i++) {
      this.platforms.create(TILE_SIZE/2 + TILE_SIZE*i, 375, 'ground');
    }

    this.player = new Player(this, 120, 239);
    this.player.setScale(2);
    this.physics.add.existing(this.player);
    this.player.body.offset.x = 22;
    this.player.body.offset.y = 33;
    this.physics.add.collider(this.player, this.platforms);

    this.physics.add.overlap(this.player, this.arrowPool, this.collideWithArrow, null, this);

    this.input.on('pointerdown', function(event) {
      if (this.player.body.touching.down) {
        this.player.body.setVelocityY(-490);
        this.player.playJump();
      }
    }, this);

    var tapZone = this.add.zone(0, 0, 600, 400).setOrigin(0).setName('Tap').setInteractive();

    const self = this;

    this.input.on('gameobjectdown', function(pointer, gameObject) {
      if(gameObject.name === 'Tap') {
        if (self.player.body.touching.down) {
          self.player.body.setVelocityY(-490);
          self.player.playJump();
        }
      }
    })
  }

  collideWithArrow() {
      this.scene.start('start_scene');
  }

  update(time, delta) {
    if (time > 1000 && time - this.lastEmit > this.EMITTING_INTERVAL) {
      const arrow = this.arrowPool.getFirstDead(true, 600, 300);
      this.physics.add.existing(arrow);
      arrow.body.allowGravity = false;
      arrow.body.setSize(30, 10);
      this.add.existing(arrow);
      arrow.angle = -45;
      arrow.setScale(2);
      this.lastEmit = time;
    }
  }
}
