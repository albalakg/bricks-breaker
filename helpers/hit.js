export function hit(ball, gameObject) {
  let topOfBall = ball.position.y;
  let bottomOfBall = ball.position.y + ball.size;
  let leftOfBall = ball.position.x;
  let rightOfBall = ball.position.x + ball.size;
  let centerOfBallX = (ball.position.x * 2 + ball.size) / 2;
  let centerOfBallY = (ball.position.y * 2 + ball.size) / 2;


  let topOfObject = gameObject.position.y;
  let bottomOfObject = gameObject.position.y + gameObject.height;
  let leftOfObject = gameObject.position.x;
  let rightOfObject = gameObject.position.x + gameObject.width;
  let centerOfObject = (gameObject.position.x * 2 + gameObject.width) /  2;

  if (
    bottomOfBall >= topOfObject &&
    topOfBall <= bottomOfObject &&
    centerOfBallX >= leftOfObject &&
    centerOfBallX <= rightOfObject
  ) {
    return [
      topOfBall,
      bottomOfBall,
      leftOfBall,
      rightOfBall,
      centerOfBallX,

      centerOfObject,
      topOfObject,
      bottomOfObject,
      leftOfObject,
      rightOfObject,

      centerOfBallY
    ];
  } else {
    return false;
  }

}