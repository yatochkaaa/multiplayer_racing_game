import Phaser from 'phaser';
import LoadingBar from '../classes/LoadingBar';
import tileset from '../../assets/tileset.png';
import tilemap from '../../assets/tilemap.json';

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super('Preload');
  }

  preload () {
    this.add.sprite(0, 0, 'bg').setOrigin(0);
    this.LoadingBar = new LoadingBar(this);
    this.load.spritesheet('tileset', tileset, {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.tilemapTiledJSON('tilemap', tilemap);
  }

  create () {
    this.scene.start('Game');
  }
}