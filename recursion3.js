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

function draw() {
}

