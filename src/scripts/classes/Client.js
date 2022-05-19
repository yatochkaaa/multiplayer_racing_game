import Phaser from 'phaser';
import io from 'socket.io-client';

const HOST = 'http://localhost:3000';

export default class Client extends Phaser.Events.EventEmitter {
  constructor() {
    super();
  }

  init() {
    this.master = false;
    this.socket = io(HOST);
    this.socket.on('connect', () => {
      console.log('client connected')
    });
    this.socket.on('disconnect', () => {
      console.log('client disconnected')
    });
    this.socket.on('gameStart', data => {
      if (data && data.master) {
        this.master = data.master;
      }
      this.emit('game');
    })

    this.socket.on('enemyMove', data => {
      this.emit('data', data);
    })
  }

  send(data) {
    if (JSON.stringify(data) !== JSON.stringify(this.sent)) {
      this.sent = data;
      this.socket.emit('playerMove', data);
    }
  }
}
