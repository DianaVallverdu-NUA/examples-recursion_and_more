//values of min and max lengths and strokes to be mapped out when drawing a branch
const BRANCH_LENGTH = 100;

const ANGLES = [230, 320];
const NUM_STEPS = 5;

const MAX_ANGLE = 60;

const SEGMENT_LENGTH = 2;

const queue = [];
let inSegment = false;

function setup() {
  //create canvas
  createCanvas(innerWidth, innerHeight);

  //set angles to degrees
  angleMode(DEGREES);

  //set stroke and fill
  stroke(255);
  strokeWeight(8);
  noFill();

  //smooth stroke joins
  strokeJoin(ROUND);

}

let first = true;
const currentBranch = {};
let currentLength = 0;

function draw() {
  if (first) {
    drawFirstBranch();
    first = false;
    return;
  }

  if (queue.length === 0) return noLoop();

  if(inSegment) {
    drawSegment(currentBranch);
    currentBranch.length += SEGMENT_LENGTH;
    return;
  }

  drawNextBranch();
}

function drawFirstBranch() {
  translate(width / 2, height)
  line(0, 0, 0, -BRANCH_LENGTH);
  for (let i = 0; i < ANGLES.length; i++) {
    queue.push({ x0: width / 2, y0: height - BRANCH_LENGTH, angle: ANGLES[i] });
  }
}



/**
 * Draw one single branch
 * @param {Number} length length of branch drawn
 */
const drawNextBranch = () => {
  inSegment = true;
  const nextBranch = queue.shift();
  // rotate(nextBranch.angle)
  //draw the line vertically
  currentBranch.x0 = nextBranch.x0;
  currentBranch.y0 = nextBranch.y0;
  currentBranch.length = SEGMENT_LENGTH;
  currentBranch.angle = nextBranch.angle;
  
  //prep next branches
  const x1 = BRANCH_LENGTH * cos(nextBranch.angle)
  const y1 = BRANCH_LENGTH * sin(nextBranch.angle)

  //save the current drawing context
  for (let i = 0; i < ANGLES.length; i++) {
    queue.push({x0 : nextBranch.x0 + x1, y0: nextBranch.y0 + y1, angle: ANGLES[i]})
  }
};

const drawSegment = (branch) => {
  if(currentBranch.length > BRANCH_LENGTH) {
    inSegment = false;
    return;
  }
  translate(branch.x0, branch.y0)
  const x1 = branch.length * cos(branch.angle)
  const y1 = branch.length * sin(branch.angle)

  line(0, 0, x1, y1);
}
