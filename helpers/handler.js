let pause = false;

export default class Handler {

  constructor(paddle, game) {
    document.addEventListener('keydown', e => {
      switch (e.keyCode) {
        case 37:
          paddle.move(e.keyCode);
          break;
        case 39:
          paddle.move(e.keyCode);
          break;
        case 27:
          if ([0, 1].includes(game.gamestate)) {
            pause = !pause;
            pause ? game.updateGameState(1) : game.updateGameState(0);
          }
          break;
        case 32:
          if (game.gamestate == 2) game.start();
          break;
        case 13:
          if ([3, 4].includes(game.gamestate)) game.restart();
          if (game.gamestate == 5) game.levelUp();
          break;
      }
    })
    document.addEventListener('keyup', e => {
      if ((e.keyCode == 37 && paddle.speed < 0) || (e.keyCode == 39 && paddle.speed > 0)) {
        paddle.stop(e.keyCode)
      }
    })
  }

}