import Phaser from 'phaser';
import PreloadScene from './es6/preload-scene.js';
import StartScene from './es6/start-scene.js';
import GameScene from './es6/game-scene.js';
import './assets/css/style.css';

const config = {
  type: Phaser.AUTO,
  width: 600,
  height: 400,
  backgroundColor: '#420b4c',
  parent: 'game-container',
  pixelArt: true,
  scene: [PreloadScene, StartScene, GameScene],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {y: 1100},
      debug: false,
    },
  },
};

new Phaser.Game(config);
