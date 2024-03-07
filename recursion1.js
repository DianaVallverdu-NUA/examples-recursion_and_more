// we will do it 8 times - level 8 of depth
const MAX_LEVEL = 8;
const MIN_LEVEL = 0;

function setup() {
  //create canvas
  createCanvas(innerWidth, innerHeight);

  //set stroke and fill
  stroke(255);
  noFill();

  //no loop as we only draw once
  noLoop();

  //start recursive loop
  translate(width / 2, height / 2);
  for (let i = 0; i < 4; i++) {
    drawCircle(0, 0, width / 2, MAX_LEVEL);
    rotate(PI / 2);
  }
}

/**
 * Recursively draw circles until we get to MIN_LEVEL
 * @param {Number} x position x
 * @param {Number} y position y
 * @param {Number} d diameter of circle
 * @param {Number} count current depth of the recursive scale
 */
const drawCircle = (x, y, d, count) => {
  //draw circle
  ellipse(x, y, d);

  //end of recursion
  if (count <= MIN_LEVEL) return;

  //check if we've met final condition
  //decrease count
  count--;

  //draw next circle
  drawCircle(x + d / 2, y, d / 2, count);
  // drawCircle(x - d / 2, y, d / 2, count);
  drawCircle(x, y + d / 2, d / 2, count);
};
