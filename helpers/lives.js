export default class Lives {

  constructor(ctx, position) {
    this.image    = document.getElementById('heart');
    this.width    = 30;
    this.height   = 30;
    this.position = position;
    this.draw(ctx)
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
  }

}