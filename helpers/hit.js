export function hit(ball, gameObject) {
  let topOfBall     = ball.position.y;
  let bottomOfBall  = ball.position.y + ball.size;
  let leftOfBall    = ball.position.x;
  let rightOfBall   = ball.position.x + ball.size;
  let centerOfBallX = (ball.position.x * 2 + ball.size) / 2;
  let centerOfBallY = (ball.position.y * 2 + ball.size) / 2;

  let topOfObject     = gameObject.position.y;
  let bottomOfObject  = gameObject.position.y + gameObject.height;
  let leftOfObject    = gameObject.position.x;
  let rightOfObject   = gameObject.position.x + gameObject.width;
  let centerOfObject  = (gameObject.position.x * 2 + gameObject.width) /  2;

  if (
    bottomOfBall  >= topOfObject    &&
    topOfBall     <= bottomOfObject &&
    centerOfBallX >= leftOfObject   &&
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

export function isHit(firstObject, secondObject) {
  const topOffFirstObject     = firstObject.position.y;
  const bottomOffFirstObject  = firstObject.position.y + firstObject.size;
  const leftOffFirstObject    = firstObject.position.x;
  const rightOffFirstObject   = firstObject.position.x + firstObject.size;

  const topOfSecondObject     = secondObject.position.y;
  const bottomOfSecondObject  = secondObject.position.y + secondObject.height;
  const leftOfSecondObject    = secondObject.position.x;
  const rightOfSecondObject   = secondObject.position.x + secondObject.width;

  return  hitOnPositionX(rightOffFirstObject, leftOffFirstObject, leftOfSecondObject, rightOfSecondObject) &&
          hitOnPositionY(bottomOffFirstObject, topOffFirstObject, topOfSecondObject, bottomOfSecondObject)
}

function hitOnPositionX(rightOffFirstObject, leftOffFirstObject, leftOfSecondObject, rightOfSecondObject) {
  return  isPartlyHitFromLeft(rightOffFirstObject, leftOffFirstObject, leftOfSecondObject) ||
          isHitBetweenSides(leftOffFirstObject, leftOfSecondObject, rightOffFirstObject, rightOfSecondObject) ||
          isPartlyHitFromRight(leftOffFirstObject, rightOfSecondObject, rightOffFirstObject)
}

function hitOnPositionY(bottomOffFirstObject, topOffFirstObject, topOfSecondObject, bottomOfSecondObject) {
  return  isPartlyHitFromLeft(bottomOffFirstObject, topOffFirstObject, topOfSecondObject) ||
          isHitBetweenSides(topOffFirstObject, topOfSecondObject, bottomOffFirstObject, bottomOfSecondObject) ||
          isPartlyHitFromRight(topOffFirstObject, bottomOfSecondObject, bottomOffFirstObject)
}

function isPartlyHitFromLeft(rightOffFirstObject, leftOffFirstObject, leftOfSecondObject) {
  return (
    rightOffFirstObject >= leftOfSecondObject && 
    leftOffFirstObject  <  leftOfSecondObject
  );
}

function isPartlyHitFromRight(leftOffFirstObject, rightOfSecondObject, rightOffFirstObject) {
  return (
    leftOffFirstObject  <= rightOfSecondObject &&
    rightOffFirstObject > rightOfSecondObject
  )
}

function isHitBetweenSides(leftOffFirstObject, leftOfSecondObject, rightOffFirstObject, rightOfSecondObject) {
  return (
    leftOffFirstObject  >= leftOfSecondObject &&
    rightOffFirstObject <= rightOfSecondObject
  )
}