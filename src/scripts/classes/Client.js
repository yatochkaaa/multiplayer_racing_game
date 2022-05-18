import Phaser from 'phaser';
import io from 'socket.io-client';

const HOST = 'http://localhost:3000';

export default class Client extends Phaser.Events.EventEmitter {
  constructor() {
    super();
  }

  init() {
    const socket = io(HOST);
    socket.on('connect', () => {
      console.log('client connected')
    });
    socket.on('disconnect', () => {
      console.log('client disconnected')
    });
    socket.on('gameStart', () => {
      this.emit('game');
    })
  }
}
