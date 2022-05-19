const socketIO = require('socket.io');

module.exports = {
  init(server) {
    this.sessions = [];
    this.io = socketIO(server);
    this.io.on('connection', socket => {
      this.onConnection(socket);
    });
  },

  getPendingSession() {
    return this.sessions.find(session => session.playerSocket && !session.enemySocket);
  },

  createPendingSession(socket) {
    const session = {
      playerSocket: socket,
      enemySocket: null
    };

    this.sessions.push(session);
  },

  startGame(session) {
    session.playerSocket.emit('gameStart', { master: true });
    session.enemySocket.emit('gameStart');
  },

  onConnection(socket) {
    console.log(`New user connected ${socket.id}`);
    let session = this.getPendingSession();

    if (!session) {
      this.createPendingSession(socket);
    } else {
      session.enemySocket = socket;
      this.startGame(session);
    }
  }
};
