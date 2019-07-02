import Phaser from 'phaser';
import PlayerSpritesheet from '../assets/spritesheets/buch-characters-64px-extruded.png';
import ItemsSpritesheet from '../assets/spritesheets/items.png';
import GroundImage from '../assets/spritesheets/ground.png';
import NoMonkeyLoop from '../assets/music/no_monkey.wav';

export default class StartScene extends Phaser.Scene {
  constructor() {
    super({key: 'preload_scene'});
  }

  preload() {
    this.load.image('ground', GroundImage);

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

    this.load.audio('no_monkey', [NoMonkeyLoop]);
  }

  create() {
    const anims = this.anims;
    anims.create({
      key: 'snake-walk',
      frames: anims.generateFrameNumbers('player-spritesheet', {start: 69, end: 72}),
      frameRate: 8,
      repeat: -1,
    });

    anims.create({
      key: 'snake-jump',
      frames: anims.generateFrameNumbers('player-spritesheet', {start: 69, end: 70}),
      frameRate: 8,
      repeat: 1,
    });
    anims.create({
      key: 'king-walk',
      frames: anims.generateFrameNumbers('player-spritesheet', {start: 23, end: 26}),
      frameRate: 8,
      repeat: -1,
    });

    anims.create({
      key: 'king-jump',
      frames: anims.generateFrameNumbers('player-spritesheet', {start: 27, end: 30}),
      frameRate: 8,
      repeat: 1,
    });
    this.scene.start('start_scene');
  }

  update() {
  }
}
