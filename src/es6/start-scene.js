import Phaser from 'phaser';
import Player from './player.js';

export default class StartScene extends Phaser.Scene {
  constructor() {
    super({key: 'start_scene'});
    this.playerTypes = ['snake', 'king'];
    this.playerTypeIdx = 0;
    this.playerType = this.playerTypes[this.playerTypeIdx];
  }

  preload() {
  }

  create() {
    const arrow1 = new Arrow(this, 100, 240);
    arrow1.setScale(3);
    const arrow2 = new Arrow(this, 500, 240);
    arrow2.setScale(3);
    this.add.existing(arrow1);
    this.add.existing(arrow2);

    this.player = new Player(this, 300, 170, this.playerType);
    this.player.setScale(4);
    this.player.playWalk();
    this.player.setInteractive();

    this.player.on('pointerdown', this.onPlayerTap, this);

    this.text = this.add
        .text(300, 60, 'Salta Salta la Freccia', {
          font: '44px monospace',
          fill: '#d4963a',
        });
    this.text.setOrigin(0.5);


    this.tweens.timeline({

      targets: this.text,
      loop: -1,

      tweens: [
        {
          y: 70,
          ease: 'Sine.easeOut',
          duration: 500,
        },
        {
          y: 60,
          ease: 'Sine.easeOut',
          duration: 500,
        },
      ],

    });

    this.start = this.add
        .text(300, 350, 'Start', {
          font: '28px monospace',
          fill: '#d4963a',
        });
    this.start.setOrigin(0.5);

    this.start.setInteractive();

    this.start.on('pointerdown', this.onStartTap, this);
  }

  onPlayerTap() {
    this.playerType = this.playerTypes[++this.playerTypeIdx%2];
    this.player.setType(this.playerType);
    this.player.playWalk();
  }

  onStartTap() {
    this.scene.start('game_scene', {player: this.playerType});
  }

  update() {

  }
}

class Arrow extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y);

    this.setTexture('items', 0);
    this.setPosition(x, y);
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    this.rotation += 0.03;
  }
}
