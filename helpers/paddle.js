export default class Paddle {

  constructor(game) {
    this.image = document.getElementById('paddle');
    this.game_width = game.game_width;
    this.width = 150;
    this.height = 30;

    this.speed = 0;
    this.maxSpeed = 7;

    this.position = {
      x: game.game_width / 2 - this.width / 2,
      y: game.game_height - this.height - 10
    }

  }

  draw(ctx) {
    ctx.fillStyle = '#f00';
    ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
  }

  update(time) {
    this.position.x += this.speed;
    if (this.position.x < 0) this.position.x = 0
    if (this.position.x + this.width > this.game_width) this.position.x = this.game_width - this.width;
  }

  move(key) {
    if (key == 37) { // Move left
      this.speed = -this.maxSpeed;
    } else { // Move right
      this.speed = this.maxSpeed;
    }
  }

  stop() {
    this.speed = 0;
  }

}