import Phaser from 'phaser';
import StartScene from './es6/start-scene.js';
import './assets/css/style.css';

const config = {
  type: Phaser.AUTO,
  width: 600,
  height: 400,
  backgroundColor: "#420b4c",
  parent: "game-container",
  pixelArt: true,
  scene: StartScene,
  physics: {
    
  }
};

const game = new Phaser.Game(config);
