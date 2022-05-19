const GRASS_FRICTION = 0.3;
const ROADS_FRICTION = {
  road: 1,
  ground: 0.5,
  sand: 0.4
};

export default class Map {
  constructor(scene) {
    this.scene = scene;
    this.init();
    this.create();
  }

  init() {
    this.tilemap = this.scene.make.tilemap({ key: 'tilemap' });
    this.tileset = this.tilemap.addTilesetImage('tileset', 'tileset', 64, 64, 0, 1);
  }

  create() {
    this.createLayers();
    this.createCollisions();
    this.createOils();
    this.createCheckpoints();
  }

  createLayers() {
    this.tilemap.createStaticLayer('grass', this.tileset);
    this.tilemap.createStaticLayer('road', this.tileset);
    this.tilemap.createStaticLayer('sand', this.tileset);
    this.tilemap.createStaticLayer('ground', this.tileset);
  }

  createCollisions() {
    this.tilemap.findObject('collisions', collision => {
      const sprite = this.scene.matter.add.sprite(
        collision.x + collision.width / 2,
        collision.y - collision.height / 2,
        'objects',
        collision.name
      );
      sprite.setStatic(true);
    });
  }

  createOils() {
    this.tilemap.findObject('oils', oil => {
      const sprite = this.scene.matter.add.sprite(
        oil.x + oil.width / 2,
        oil.y - oil.height / 2,
        'objects',
        oil.name
      );
      sprite.setStatic(true);
      sprite.setSensor(true);
    });
  }

  createCheckpoints() {
    this.checkpoints = [];

    this.tilemap.findObject('checkpoints', checkpoint => {
      const rectangle = new Phaser.Geom.Rectangle(
        checkpoint.x,
        checkpoint.y,
        checkpoint.width,
        checkpoint.height
      );
      rectangle.index = checkpoint.properties.find(property => property.name === 'value').value;
      this.checkpoints.push(rectangle);
    });
  }

  getPlayerPosition(positionName) {
    return this.tilemap.findObject(positionName, position => {
      return position.name === positionName;
    });
  }

  getTileFriction(car) {
    for (const road in ROADS_FRICTION) {
      const tile = this.tilemap.getTileAtWorldXY(
        car.x,
        car.y,
        false,
        this.scene.cameras.main,
        road
      );

      if (tile) {
        return ROADS_FRICTION[road]
      }
    }

    return GRASS_FRICTION;
  }

  getCheckpoint(car) {
    const checkpoint = this.checkpoints.find(checkpoint => checkpoint.contains(car.x, car.y));

    return checkpoint ? parseInt(checkpoint.index) : false;
  }
}
