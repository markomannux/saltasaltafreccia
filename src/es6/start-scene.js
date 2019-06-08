import Phaser from 'phaser';
import Player from './player.js';
import PlayerSpritesheet from '../assets/spritesheets/buch-characters-64px-extruded.png';
import ItemsSpritesheet from '../assets/spritesheets/items.png';

export default class StartScene extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    this.load.spritesheet(
        'player-spritesheet',
        PlayerSpritesheet,
        {
          frameWidth: 64,
          frameHeight: 64,
          margin: 1,
          spacing: 2,
        }
    );

    this.load.spritesheet(
        'items',
        ItemsSpritesheet,
        {
          frameWidth: 32,
          frameHeight: 32,
          margin: 0,
          spacing: 0,
        }
    );
  }

  create() {
    const arrow1 = new Arrow(this, 100, 270);
    arrow1.setScale(3);
    const arrow2 = new Arrow(this, 500, 270);
    arrow2.setScale(3);
    this.add.existing(arrow1);
    this.add.existing(arrow2);

    this.player = new Player(this, 300, 200);
    this.player.setScale(4);

    this.text = this.add
        .text(300, 90, 'Salta Salta Freccia', {
          font: '48px monospace',
          fill: '#d4963a',
        });
    this.text.setOrigin(0.5);

    this.tweens.timeline({

      targets: this.text,
      loop: -1,

      tweens: [
        {
          y: 100,
          ease: 'Sine.easeOut',
          duration: 500,
        },
        {
          y: 90,
          ease: 'Sine.easeOut',
          duration: 500,
        },
      ],

    });
  }

  update() {

  }
}

class Arrow extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y);

    this.setTexture('items', 0);
    this.setPosition(x, y);
    this.rotation = Math.random();
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    this.rotation += 0.03;
  }
}
