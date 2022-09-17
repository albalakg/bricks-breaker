import Paddle         from "./paddle.js";
import Handler        from "./handler.js";
import Ball           from "./ball.js";
import Lives          from "./lives.js";
import DroppedObject  from "./droppedObject.js";
import { 
  buildLevel,
  Level1,
  Level2,
  Level3,
  Speed
 } from "./levels.js";

const GAMESTATE = {
  paused: 0,
  running: 1,
  menu: 2,
  gameover: 3,
  won: 4,
  levelup: 5,
}

export default class Game {

  constructor(game_width, game_height) {
    this.game_width     = game_width;
    this.game_height    = game_height;
    this.gamestate      = GAMESTATE.menu;
    this.objects        = [];
    this.droppedObjects = [];
    this.statedBricks   = [];
    this.bricks         = [];
    this.levels         = [Level1, Level2, Level3];
    this.currentLevel   = 0;
    this.lives          = 3;
    this.speed          = Speed[this.currentLevel];
    this.paddle         = new Paddle(this);
    this.ball           = new Ball(this);

    new Handler(this.paddle, this);
  }

  start() {
    this.gamestate = GAMESTATE.running;
    this.bricks = buildLevel(this, this.levels[this.currentLevel]);
    this.speed = Speed[this.currentLevel];
    if (this.bricks) {
      this.objects = [this.ball, this.paddle];
      this.startedBricks = this.bricks;
    }
    else this.gamestate = GAMESTATE.won;
  }

  update(time) {
    if (this.lives === 0) this.gamestate = GAMESTATE.gameover;
    
    if (this.gamestate != 1) return;
    [...this.objects, ...this.bricks].forEach(e => e.update(time));
    this.bricks = this.bricks.filter(brick => !brick.markedOfHit);
  }

  draw(ctx) {
    this.checkGameState(ctx)
    if ([2, 3, 4, 5].includes(this.gamestate)) return;
    [...this.objects, ...this.bricks].forEach(e => e.draw(ctx));
    
    this.drawDroppedObjects();

    this.generateLives(ctx);
    this.generateLevel(ctx);

    if (this.gamestate == GAMESTATE.running && this.bricks.length === 0) {
      this.currentLevel++;
      this.gamestate = GAMESTATE.levelup;
    }
  }

  drawDroppedObjects() {
    this.droppedObjects.forEach((droppedObject, index) => {
      if(droppedObject.position.y > this.game_height) {
        this.droppedObjects.splice(index, 1);
        return;
      }

      droppedObject.draw(index);
    })
  }

  updateGameState(state) {
    this.gamestate = state;
  }

  restart() {
    if (this.gamestate == 1) return;
    this.lives = 3;
    this.currentLevel = 0;
    this.start();
    this.ball.reset();
  }

  checkGameState(ctx) {
    switch (this.gamestate) {
      case GAMESTATE.paused:
        ctx.rect(0, 0, this.game_width, this.game_height);
        ctx.fillStyle = "rgb(0,0,0, 0.4)";
        ctx.fill();

        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Paused", this.game_width / 2, this.game_height / 2);

        break;
      case GAMESTATE.menu:
        ctx.rect(0, 0, this.game_width, this.game_height);
        ctx.fillStyle = "black";
        ctx.fill();

        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Press SPACEBAR To Start", this.game_width / 2, this.game_height / 2);
        break;
      case GAMESTATE.gameover:
        ctx.rect(0, 0, this.game_width, this.game_height);
        ctx.fillStyle = "black";
        ctx.fill();

        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", this.game_width / 2, this.game_height / 2);
        ctx.font = "24px Arial";
        ctx.fillText("Press Enter To Start Again", this.game_width / 2, this.game_height / 2 + 50);
        break;
      case GAMESTATE.won:
        ctx.rect(0, 0, this.game_width, this.game_height);
        ctx.fillStyle = "black";
        ctx.fill();

        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Congratulation! You Have Won!!!", this.game_width / 2, this.game_height / 2);
        ctx.font = "24px Arial";
        ctx.fillText("Press Enter To Start Again", this.game_width / 2, this.game_height / 2 + 50);
        break;
      case GAMESTATE.levelup:
        if (this.currentLevel == this.levels.length) return this.gamestate = GAMESTATE.won;

        ctx.rect(0, 0, this.game_width, this.game_height);
        ctx.fillStyle = "black";
        ctx.fill();

        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText(`Greate! You Have Finished Level${this.currentLevel}`, this.game_width / 2, this.game_height / 2);
        ctx.font = "24px Arial";
        ctx.fillText("Press Enter To Start Next Level ", this.game_width / 2, this.game_height / 2 + 50);
        break;
    }
  }

  generateLives(ctx) {
    for (let i = 1; i < this.lives + 1; i++) {
      new Lives(ctx, { x: 50 * i, y: 10 })
    }
  }

  generateLevel(ctx) {
    ctx.font = "18px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText(`Level${this.currentLevel + 1}`, this.game_width - 35, 25);
  }

  levelUp() {
    this.gamestate = GAMESTATE.running;
    this.start();
    this.ball.reset();
  }

}