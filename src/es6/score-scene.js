import Phaser from 'phaser';

export default class ScoreScene extends Phaser.Scene {
  constructor() {
    super({key: 'score_scene'});
  }

  init(data) {
    this.data = data;
  }

  preload() {
  }

  create() {
    const scoreText = `Hai fatto ${this.data.score} punti!`;
    this.text = this.add
        .text(300, 160, scoreText, {
          font: '44px monospace',
          fill: '#d4963a',
        });
    this.text.setOrigin(0.5);

    this.okButton = this.add
        .text(300, 350, 'Ok', {
          font: '28px monospace',
          fill: '#d4963a',
        });
    this.okButton.setOrigin(0.5);

    this.okButton.setInteractive();

    this.okButton.on('pointerdown', this.onStartTap, this);
  }

  onStartTap() {
    this.scene.start('start_scene');
  }

  update() {

  }
}
