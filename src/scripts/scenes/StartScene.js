import Phaser from 'phaser';

export default class StartScene extends Phaser.Scene {
  constructor() {
    super('Start');
  }

  create() {
    this.createBackground();
    this.createButtons();
    this.createSetEvents();
  }

  createBackground() {
    this.add.sprite(0, 0, 'bg').setOrigin(0);
  }

  createButtons() {
    const style = {
      fontFamily: 'Arial',
      fontSize: '24px',
      fontStyle: 'bold',
      color: '#fafad2'
    };
    const popupWidth = 200;
    const popupHeight = 200;

    this.add.graphics()
    .setScrollFactor(0)
    .fillStyle(0x000000, 0.5)
    .fillRoundedRect(
      (this.sys.game.config.width - popupWidth) / 2,
      (this.sys.game.config.height - popupHeight) / 2,
      popupWidth,
      popupHeight
    );

    this.button1 = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 25, '1 Player', style)
      .setOrigin(0.5)
      .setInteractive();

    this.button2 = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 25, '2 Player', style)
      .setOrigin(0.5)
      .setInteractive();
  }

  createSetEvents() {
    this.button1.on('pointerdown', this.startGame, this);
    this.button2.on('pointerdown', this.requestGame, this);
  }

  startGame() {
    this.scene.start('Game');
  }

  requestGame() {
    // инициализировать клиент
    // отправить запрос игры на сервер
    // по факту получения противинка
    // начать игру
    this.startGame();
  }
}
