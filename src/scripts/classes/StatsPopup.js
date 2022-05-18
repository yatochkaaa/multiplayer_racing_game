export default class StatsPopup {
  constructor(scene, stats) {
    this.scene = scene;
    this.stats = stats;
    this.create();
  }

  create() {
    const style = { fontFamily: 'Arial', fontSize: '30px', color: '#fff' };
    const popupWidth = 800;
    const popupHeight = 600;

    this.popup = this.scene.add.graphics()
      .setScrollFactor(0)
      .fillStyle(0x000000, 0.5)
      .fillRoundedRect(
        (this.scene.sys.game.config.width - popupWidth) / 2,
        (this.scene.sys.game.config.height - popupHeight) / 2,
        popupWidth,
        popupHeight
      );

    this.title = this.scene.add.text(
      this.scene.cameras.main.centerX,
      this.scene.cameras.main.centerY - 200,
      `Level Complete!`,
      { fontFamily: 'Arial', fontSize: '46px', color: '#fafad2' }
    )
      .setOrigin(0.5)
      .setScrollFactor(0)

    this.timeText =
      this.scene.add.text(
          this.scene.cameras.main.centerX,
          this.scene.cameras.main.centerY - 50,
          `Time Total: ${this.stats.time.toFixed(2)}`,
          style
        )
          .setOrigin(0.5)
          .setScrollFactor(0);

    this.timeBestLapText =
      this.scene.add.text(
          this.scene.cameras.main.centerX,
          this.scene.cameras.main.centerY + 50,
          `Best Lap: ${this.stats.timeBestLap.toFixed(2)}`,
          style
        )
          .setOrigin(0.5)
          .setScrollFactor(0);

    this.text = this.scene.add.text(
      this.scene.cameras.main.centerX,
      this.scene.cameras.main.centerY + 200,
      `Tap to continue!`,
      style
    )
      .setOrigin(0.5)
      .setScrollFactor(0)

    this.scene.input.once('pointerdown', () => {
      this.scene.scene.start('Game');
    });
  }
}
