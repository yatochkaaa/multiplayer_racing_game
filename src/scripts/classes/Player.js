const DIRECTIONS = Object.freeze({
  BACKWARD: -1,
  NONE: 0,
  FORWARD: 1
});
const TURNS = Object.freeze({
  LEFT: -1,
  NONE: 0,
  RIGHT: 1
});
const SPEED = 10;
const ACCELERATION = 0.5;


export default class Player {
  constructor(scene, map) {
    this.scene = scene;
    this.map = map;
    const position = this.map.getPlayerPosition();
    this.car = this.scene.matter.add.sprite(position.x, position.y, 'objects', 'car_blue_1');
    this.car.setFixedRotation(true);
    this._velocity = 0;
    this.checkpoint = 0;
    this.laps = 0;
  }
  
  get lap() {
    return this.laps + 1;
  }

  get direction() {
    let direction = DIRECTIONS.NONE;

    if (this.scene.cursors.up.isDown) {
      direction = DIRECTIONS.FORWARD;
    } else if (this.scene.cursors.down.isDown) {
      direction = DIRECTIONS.BACKWARD;
    }

    return direction;
  }

  get turn() {
    let turn = TURNS.NONE;

    if (this.scene.cursors.left.isDown) {
      turn = TURNS.LEFT;
    } else if (this.scene.cursors.right.isDown) {
      turn = TURNS.RIGHT;
    }

    return turn;
  }

  get velocity() {
    const speed = Math.abs(this._velocity);
    const max = this.getMaxSpeed();

    if (this.direction && speed < max) {
      this._velocity += ACCELERATION * Math.sign(this.direction);
    } else if (
      (!this.direction && speed > 0) ||
      (this.direction && speed > max)
    ) {
      this._velocity -= ACCELERATION * Math.sign(this._velocity);
    }

    return this._velocity;
  }

  get angle() {
    return this.car.angle + this.turn * SPEED / 2;
  }

  getVelocityFromAngle() {
    const vec2 = new Phaser.Math.Vector2();

    return vec2.setToPolar(this.car.rotation - Math.PI / 2, this.velocity);
  }

  getMaxSpeed() {
    return SPEED * this.map.getTileFriction(this.car);
  }

  move() {
    this.car.setAngle(this.angle);
    const velocity = this.getVelocityFromAngle();
    this.car.setVelocity(velocity.x, velocity.y);
    this.checkPosition();
  }

  checkPosition() {
    const checkpoint = this.map.getCheckpoint(this.car);
    if (checkpoint) {
      this.onCheckpoint(checkpoint);
    }
  }

  onCheckpoint(checkpoint) {
    console.log(checkpoint, this.checkpoint);
    if (checkpoint === 1 && this.checkpoint === this.map.checkpoints.length) {
      this.checkpoint = 1;
      ++this.laps;
      this.car.emit('lap', this.lap);
    } else if (checkpoint === this.checkpoint + 1) {
      ++this.checkpoint;
    }
  }
}
