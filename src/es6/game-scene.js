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
    /*
     * Initializing some variables
     */
    this.score = 0;
    const TILE_SIZE = 72;
    this.lastEmit = 0;
    this.nextEmit = this.BASE_EMITTING_INTERVAL;

    /*
     * Creating ground
     */
    this.platforms = this.physics.add.staticGroup();
    this.arrowPool = this.add.group();
    this.arrowPool.classType = Arrow;

    for (let i = 0; i<9; i++) {
      this.platforms.create(TILE_SIZE/2 + TILE_SIZE*i, 375, 'ground');
    }

    /*
     * Creating player
     */
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

    /*
     * Setting up tapping area
     */
    this.add.zone(0, 0, 600, 400).setOrigin(0).setName('Tap').setInteractive();
    this.input.on('gameobjectdown', this.onTap, this);

    /*
     * Score collider
     */
    this.hiddenObject = this.add.rectangle(25, 270, 20, 120, 0x000000).setAlpha(0.01);
    this.physics.add.existing(this.hiddenObject);
    this.hiddenObject.body.allowGravity = false;

    this.physics.add.overlap(this.arrowPool,
        this.hiddenObject,
        this.onArrowOverlapsHidden,
        null,
        this);

    /*
     * Arrow kill collider
     */
    this.outOfScreenObject = this.add.rectangle(-25, 270, 20, 120, 0x000000).setAlpha(0.01);
    this.physics.add.existing(this.outOfScreenObject);
    this.outOfScreenObject.body.allowGravity = false;

    this.physics.add.overlap(this.arrowPool,
        this.outOfScreenObject,
        this.onArrowOutOfBounds,
        null,
        this);

    /*
     * Score panel
     */
    this.scorePanel = this.add
        .text(16, 16, this.getScore(), {
          font: '18px monospace',
          fill: '#000000',
          padding: {x: 20, y: 10},
          backgroundColor: '#ffffff',
        })
        .setScrollFactor(0)
        .setDepth(1000);
  }

  collideWithArrow() {
    this.scene.start('start_scene');
  }

  onArrowOverlapsHidden(arrow, hidden) {
    if (!arrow.dodged) {
      arrow.dodged = true;
      this.score++;
      this.scorePanel.setText(this.getScore());
    }
  }
  onTap(pointer, gameObject) {
    if (gameObject.name === 'Tap') {
      if (this.player.body.touching.down) {
        this.player.body.setVelocityY(-490);
        this.player.playJump();
      }
    }
  }

  getScore() {
    return `Score: ${this.score}`;
  }
  
  onArrowOutOfBounds(arrow, outOfScreenObject) {
    arrow.setActive(false);
    arrow.setVisible(false);
  }

  update(time, delta) {
    if (time > 1000 && time - this.lastEmit > this.BASE_EMITTING_INTERVAL) {
      const vPos = 275 + Math.floor(Math.random()*50);
      const arrow = this.arrowPool.getFirstDead(true, 600, vPos);
      arrow.dodged = false;
      arrow.setVisible(true);
      arrow.setActive(true);

      this.lastEmit = time;
      this.nextEmit = this.BASE_EMITTING_INTERVAL + Math.floor(Math.random()*500);
    }
  }
}
