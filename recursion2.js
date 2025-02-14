let trunkColorOne;
let trunkColorTwo;

//values of min and max lengths and strokes to be mapped out when drawing a branch
const MAX_BRANCH_LENGTH = 200;
const MIN_STROKE = 1;
const MAX_STROKE = 8;

const MOTHER_BRANCHES = 1;

const CHILD_BRANCHES = 5;

const MAX_ANGLE = 60;

const LEAVE_SIZE = 10;

const lenghtColors = {};

function setup() {
  //create canvas
  createCanvas(innerWidth, innerHeight);

  //set angles to degrees
  angleMode(DEGREES);

  //set stroke and fill
  stroke(255);
  noFill();

  //smooth stroke joins
  strokeJoin(ROUND);

  //define colors
  trunkColorOne = color("#8a5f03");
  trunkColorTwo = color("#756319");

  //no loop as we only draw once
  // noLoop();
}

let motherBranches = 0;
function draw() {
  if (motherBranches === MOTHER_BRANCHES) noLoop();

  //translate to middle bottom
  translate(width / 2, height);

  //draw the tree
  drawBranch(MAX_BRANCH_LENGTH, MAX_ANGLE);

  //keep number of mother branches
  motherBranches++;
}

/**
 * Draw one single branch
 * @param {Number} length length of branch drawn
 */
const drawBranch = (length, maxAngle) => {
  //if time to draw leave, draw and return
  if (length < LEAVE_SIZE || (length < MAX_BRANCH_LENGTH && random() <  0.1)) {
    drawLeave();
    return;
  }

  drawIndividualBranch(length, maxAngle);
};

const drawLeave = () => {
  push();
  //generate semi random color
  const r = 200 + random(-20, 20);
  const g = 20 + random(-20, 20);
  const b = 40 + random(-20, 20);

  fill(r, g, b);

  //remove stroke
  noStroke();

  //random radius
  let radius = random(5, 10);

  //draw leave
  beginShape();

  //draw semi circle part of circle
  for (let theta = 45; theta < 135; theta++) {
    //calculate x and y
    const x = radius * cos(theta);
    const y = radius * sin(theta);

    //draw point there
    vertex(x, y);
  }

  //draw opposite part of the circle
  for (let theta = 135; theta > 45; theta--) {
    const x = radius * cos(theta);
    const y = radius * sin(-theta);

    //draw point there
    vertex(x, y);
  }

  endShape(CLOSE);

  pop();
};

const drawIndividualBranch = (length, maxAngle) => {
  // stroke weight is propotional to branch thickness
  strokeWeight(
    map(length, LEAVE_SIZE, MAX_BRANCH_LENGTH, MIN_STROKE, MAX_STROKE)
  );

  //mix two colours for the branch
  //use 0.3 and 0.7 so that we can have an organic color - near an equal mix
  stroke(lerpColor(trunkColorOne, trunkColorTwo, random(0.3, 0.7)));

  //draw the line vertically
  line(0, 0, 0, -length);

  //immediately translate the drawing context to end of the line ready for next line
  translate(0, -length);

  //save the current drawing context
  for (let i = 0; i < CHILD_BRANCHES; i++) {
    push();
    //rotate the whole canvas
    rotate(random(-maxAngle, +maxAngle));
    //create new branch slighlty smaller than the current one
    drawBranch(length * map(i, 0, CHILD_BRANCHES, 0.5, 0.8), maxAngle);
    //restore drawing context
    pop();
  }
};
