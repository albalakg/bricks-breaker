import { hit } from './hit.js'

export default class Brick {

  constructor(game) {
    this.game_width   = game.game_width;
    this.game_height  = game.game_height;
    this.game         = game;
    this.image        = document.getElementById('ball');
    this.size         = 20;
    this.reset();
  }

  reset() {
    this.position = { x: 600 / 2, y: 400 };
    this.speed    = { x: this.game.speed / 2, y: -this.game.speed / 2 }
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
  }

  update() {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    // Left / Right Wall, changing direction when hits
    if (this.position.x + this.size > this.game_width || this.position.x < 0) this.speed.x = -this.speed.x;
    // Top / Bottom Wall, changing direction when hits
    if (this.position.y < 0) this.speed.y = -this.speed.y;
    // Game Over  
    if (this.position.y + this.size > this.game_height) {
      this.game.lives--;
      this.reset();
    }

    let side = hit(this, this.game.paddle);
    if (side) {
      // Changing the direction of the ball when hits, depends on where he touch the paddle
      let contact;

      if (side[2] > 0) {
        contact = side[2] - side[5];
      } else {
        contact = side[3] + side[5];
      }

      // Calculating the direction of the ball
      this.speed.x      = contact / 25;
      this.speed.y      = -this.speed.y;
      this.position.y   = this.game.paddle.position.y - this.size;

      if (this.speed.x <= this.game && this.speed.x >= 0) {
        this.speed.y = -(this.game.speed - this.speed.x);
      }
      else {
        this.speed.y = -(this.game.speed + this.speed.x);
      }

      if (this.speed.y < -this.game.speed) {
        this.speed.y = -this.game.speed / 2;
      }
    }
  }

}