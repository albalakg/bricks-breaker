import { hit } from './hit.js'

export default class Brick {

  constructor(game, position) {
    this.image = document.getElementById('brick');

    this.game = game;

    this.position = position;
    this.width = 50;
    this.height = 20;
    this.markedOfHit = false;
  }

  draw(ctx, position) {
    ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    let touch = hit(this.game.ball, this)
    if (touch) {
      if ((touch[3] <= touch[8] || touch[3] >= touch[9]) && (touch[10] <= touch[7] || touch[10] >= touch[6])) {
        // If the ball hits on the side of the brick
        this.game.ball.speed.x = -this.game.ball.speed.x;
      } else {
        // If the ball hits on the top or bottom of the brick
        this.game.ball.speed.y = -this.game.ball.speed.y;
      }
      this.markedOfHit = true;
    }
  }

}