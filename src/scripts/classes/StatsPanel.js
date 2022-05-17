export default class StatsPanel {
  constructor(scene, stats) {
    this.scene = scene;
    this.stats = stats;
    this.create();
  }

  create() {
    const style = {
      fontFamily: 'Arial',
      fontSize: '24px',
      color: '#fff'
    };

    this.lapsText = this.scene.add.text(10, 10, `Laps: ${this.stats.lap}/${this.stats.laps}`, style).setScrollFactor(0);
    this.timeText = this.scene.add.text(10, 35, `Time: ${this.stats.time}`, style).setScrollFactor(0);
    this.timeLapText = this.scene.add.text(10, 60, `Time lap: ${this.stats.timeLap}`, style).setScrollFactor(0);
    this.timeBestLapText = this.scene.add.text(10, 85, `Time best lap: ${this.stats.timeBestLap}`, style).setScrollFactor(0);
  }

  render() {
    this.lapsText.setText(`Laps: ${this.stats.lap}/${this.stats.laps}`);
    this.timeText.setText(`Time: ${this.stats.time.toFixed(2)}`);
    this.timeLapText.setText(`Time lap: ${this.stats.timeLap.toFixed(2)}`);
    this.timeBestLapText.setText(`Time best lap: ${this.stats.timeBestLap.toFixed(2)}`);
  }
}
