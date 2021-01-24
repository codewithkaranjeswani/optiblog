let slider, gradf, gradc, origin;

function drawArrow(base, vec, myColor) {
  push();
  stroke(myColor);
  strokeWeight(3);
  fill(myColor);
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  let arrowSize = 7;
  translate(vec.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}

function setup() {
  let canv = createCanvas(400, 400);
  canv.parent('sketch-container');
  background(220);
  translate(width / 2, height / 2);
  scale(1, -1);
  slider = createSlider(-PI / 4, 3 * PI / 4, PI / 3, PI / 18);
  slider.parent('slid-container')
  gradf = createVector(150, 150);
  gradc = createVector(100, 100);
  origin = createVector(0, 0);
  frameRate(10);
}

function draw() {
  background(220);
  translate(width / 2, height / 2);
  scale(1, -1);
  // line(-width/2, 0, width/2, 0); // X axis
  // line(0, -height/2, 0, height/2); // Y axis
  drawArrow(origin, gradf, 'red');

  stroke('red');
  strokeWeight(1);
  line(-gradf.y, gradf.x, gradf.y, -gradf.x);
  push();
  scale(1, -1);
  translate(-10, -gradf.y * 2 - 10);
  fill('red');
  text('grad_f(x)', gradf.x, gradf.y);
  pop();

  let theta = slider.value();
  let len_gc = mag(gradc.x, gradc.y);
  gradc.x = len_gc * cos(theta);
  gradc.y = len_gc * sin(theta);
  stroke('red');
  strokeWeight(1);
  drawArrow(origin, gradc, 'blue');

  stroke('blue');
  strokeWeight(1);
  line(-gradc.y, gradc.x, gradc.y, -gradc.x);
  push();
  scale(1, -1);
  translate(-10, -gradc.y * 2 - 10);
  fill('blue');
  text('grad_c(x)', gradc.x, gradc.y);
  pop();

  let ang = p5.Vector.dot(gradf, gradc) / (gradc.mag() * gradf.mag());
  if (ang == 1) {
    push();
    scale(1, -1);
    translate(-50, -height + 100);
    stroke('green');
    fill('green');
    strokeWeight(3);
    textSize(20);
    text("OPTIMAL POINT", 0, height / 2 - 50);
    pop();
  } else {

  }

  stroke('blue');
  strokeWeight(2);
  fill(150, 200, 150);
  if (theta >= PI / 4) {
    beginShape();
    vertex(gradc.y, -gradc.x);
    vertex(0, 0);
    vertex(gradf.y, -gradf.x);
    endShape(CLOSE);
  } else {
    beginShape();
    vertex(-gradc.y, gradc.x);
    vertex(0, 0);
    vertex(-gradf.y, gradf.x);
    endShape(CLOSE);
  }
}