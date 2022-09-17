import Game from "./helpers/game.js";

// Global Variables
const canvas = document.getElementById('game_screen');
const ctx = canvas.getContext('2d');
const game_width = 600;
const game_height = 500;
const game = new Game(game_width, game_height);

let lastTime = 0;
// End


// Clear the screen
ctx.clearRect(0, 0, 800, 600)



function gameLoop(timestamp) {
  let time = timestamp - lastTime;
  lastTime = timestamp;

  ctx.clearRect(0, 0, game_width, game_height);

  game.update(time);
  game.draw(ctx);

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);


