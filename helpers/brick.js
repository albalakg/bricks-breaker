import { hit }  from './hit.js'
import DroppedObject, { CHANCE_OF_DROP }  from "./droppedObject.js";

export default class Brick {

  constructor(game, position) {
    this.image              = document.getElementById('brick');
    this.game               = game;
    this.position           = position;
    this.width              = 50;
    this.height             = 20;
    this.markedOfHit        = false;
    this.totalChance        = 100;
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    let touch = hit(this.game.ball, this)
    if (!touch) {
      return;
    }

    this.markedOfHit = true;
    if(this.toDropAnObject()) {
      this.dropAnObject()
    }

    // If the ball hits on the side of the brick
    if ((touch[3] <= touch[8] || touch[3] >= touch[9]) && (touch[10] <= touch[7] || touch[10] >= touch[6])) {
      return this.game.ball.speed.x = -this.game.ball.speed.x;
    }

    // If the ball hits on the top or bottom of the brick
    this.game.ball.speed.y = -this.game.ball.speed.y;
  }

  toDropAnObject() {
    const randomNumber  = Math.floor(Math.random() * this.totalChance);
    return randomNumber <= (CHANCE_OF_DROP * this.totalChance);
  }

  dropAnObject() {
    const position = {
      y: this.position.y,
      x: this.position.x
    };
    
    this.game.droppedObjects.push(
      new DroppedObject(this.game, position)
    );
  }

}