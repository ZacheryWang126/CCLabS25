let x, y;
let m = 0.008;
let n = 0.03;
let j = 10;
let t = 0;
let s = 30;

function setup() {
  //createCanvas(800, 500);
   let canvas = createCanvas(800, 500);
  canvas.id("p5-canvas");
  canvas.parent("p5-canvas-container");
  x = width / 2;
  y = random(0, height);
}

function draw() {
  let r = map(sin(frameCount * 0.02), -1, 1, 0, 100);
  let g = map(sin(frameCount * 0.03), -1, 1, 100, 200);
  let b = map(sin(frameCount * 0.01), -1, 1, 200, 255);
  background(r, g, b, 50);
  //background lines
  noFill();
  for (let i = 0; i < width; i += s) {
    for (let j = 0; j < width; j += s) {
      push();
      let d = dist(x, y, i, j);
      let maxd = dist(0, 0, width, height) / 2;
      let circleSize = map(d, 0, maxd, 5, 60);
      let angle = map(d, 0, maxd, 0, 2 * PI);
      let op = map(d, 0, maxd, 30, 0);
      let sw = map(d, 0, maxd / 2, 7, 1);
      strokeWeight(sw);
      translate(i, j);
      rotate(angle);
      stroke(255, op);
      line(0, 0, circleSize, circleSize);
      pop();
    }
  }

  // Draw wave patterns
  for (let i = 0; i < 5; i++) {
    noFill();
    stroke(255, 255, 255, 50);
    beginShape();
    for (let x = 0; x < width; x += 20) {
      let y =
        height / 2 +
        50 * sin(x * 0.02 + frameCount * 0.02 + i) +
        30 * sin(x * 0.01 - frameCount * 0.03);
      vertex(x, y);
    }
    endShape();
  }

  x = width * noise(frameCount * m * 0.5);
  y = height * noise(frameCount * n * 0.5);
  let dynamicBlue = map(sin(frameCount * 0.05), -1, 1, 30, 255);
  // let Offset = map(cos(frameCount * 0.05), -1, 1, 100, 255);
  noStroke();
  fill(0, 0, dynamicBlue);
  push();
  translate(x, y);
  beginShape();
  for (let i = 0; i < 16; i++) {
    let angle = (i * 2 * PI) / 16;
    let radius = j * (1 + 0.4 * sin(i * 4 + frameCount * 0.1));
    let x = cos(angle) * radius;
    let y = sin(angle) * radius;
    vertex(x, y);
  }
  endShape(CLOSE);
  pop();

  if (keyIsPressed) {
    m = 0.005;
    n = 0.01;
  } else {
    m = 0.008;
    n = 0.03;
  }

  //Feed it with the mouse pressed
  if (mouseIsPressed) {
    noStroke();
    fill(random(0, 255), random(0, 255), random(0, 255));
    push();
    translate(mouseX, mouseY);
    beginShape();
    for (let i = 0; i < 12; i++) {
      let angle = (i * 2 * PI) / 12;
      let radius = 5 * (1 + 0.3 * sin(i * 3));
      let x = cos(angle) * radius;
      let y = sin(angle) * radius;
      vertex(x, y);
    }
    endShape(CLOSE);
    pop();
    j = j + 3;
  }

  //Do Not Feed Too Much
  if (j > 300) {
    text("💀DEAD!💀", width / 2 - 60, height / 2);
    j = 0;
    background(0);
  }
  if (j >= 50) {
    fill(255, 155, 150);
    push();
    translate(
      x + 180 * sin(frameCount * 0.03),
      y + 180 * cos(frameCount * 0.03)
    );
    beginShape();
    for (let i = 0; i < 16; i++) {
      let angle = (i * 2 * PI) / 16;
      let radius = j * 0.5 * (1 + 0.4 * sin(i * 4 + frameCount * 0.1));
      let x = cos(angle) * radius;
      let y = sin(angle) * radius;
      vertex(x, y);
    }
    endShape(CLOSE);
    pop();
  }
}
