import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  create() {
    this.add.sprite(0, 0, 'bg').setOrigin(0);
  }
}