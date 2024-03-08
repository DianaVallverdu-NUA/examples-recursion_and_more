//initial length of branch
let INITIAL_LENGTH;

//minimum length drawn
const MIN_LENGTH = 50;

//children per branch
const CHILDREN = 4;

const RANDOM_RATIO = 0.1;

const ANGLES = [0, 90, 180, 270];

//angles of children branches
let COSINES;
let SINES;

//length ratio of next branch
const LENGTH_RATIO = 0.6;

//queue of branches to draw
const queue = [];
const stylesQueue = [];

//choose random color
const newRandomStroke = () => {
  const r = random(255);
  const g = random(255);
  const b = random(255);
  alpha -= 10;
  if(alpha <= 0) noLoop();
  stroke(r, g, b, alpha);
}

function setup() {
  //create canvas
  createCanvas(innerWidth, innerHeight);

  //set angles to degrees
  angleMode(DEGREES);

  COSINES = [cos(ANGLES[0]), cos(ANGLES[1]), cos(ANGLES[2]), cos(ANGLES[3])];
  SINES = [sin(ANGLES[0]), sin(ANGLES[1]), sin(ANGLES[2]), sin(ANGLES[3])];

  //set stroke and fill
  stroke(255);
  strokeWeight(3);
  noFill();

  INITIAL_LENGTH = innerHeight > innerWidth ? innerWidth * 0.205 : innerHeight  * 0.205;
  
  // drawFirstBranch();
}

let first = true;
let rotation = -20;
let alpha = 265;

function draw() {
  translate(width / 2, height / 2);
  rotate(rotation);


  if(queue.length === 0) {
    rotation += 20;
    newRandomStroke();
    drawFirstBranch();
    return;
  }

  drawNextBranches();

}

const drawFirstBranch = () => {

  for (let i = 0; i < CHILDREN; i++) {
    queue.push({
      length: INITIAL_LENGTH,
      cosine: COSINES[i] + random(-RANDOM_RATIO, RANDOM_RATIO),
      sine: SINES[i] + random(-RANDOM_RATIO, RANDOM_RATIO),
      x0: 0,
      y0: 0,
    });
  }
  first = false;
};

const drawNextBranches = () => {
    const branch = queue.shift();

    const x = branch.x0 + branch.length * branch.cosine;
    const y = branch.y0 - branch.length * branch.sine;

    line(branch.x0, branch.y0, x, y);
    // circle(x, y, branch.length * 0.5);

    if (branch.length <= MIN_LENGTH) return;

    for (let i = 0; i < CHILDREN; i++) {
      queue.push({
        length: branch.length * LENGTH_RATIO,
        cosine: COSINES[i] + random(-RANDOM_RATIO, RANDOM_RATIO),
        sine: SINES[i] + random(-RANDOM_RATIO, RANDOM_RATIO),
        x0: x,
        y0: y,
      });
    }
};
