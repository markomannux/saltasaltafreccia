export default class ScoreService {
  getHighScore() {
    return this.parseScore();
  }

  setHighScore(score) {
    window.localStorage.setItem('hiscore', score);
  }

  isHighScore(score) {
    return score > this.parseScore();
  }

  parseScore() {
    const currentHiScore = window.localStorage.getItem('hiscore') || '0';
    return parseInt(currentHiScore);
  }
}


