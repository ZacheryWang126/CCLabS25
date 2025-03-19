let x, y;
let m = 0.008;
let n = 0.03;
let j = 10;
let t = 0;
let bubbles = [];

function setup() {
  createCanvas(800, 500);
   let canvas = createCanvas(800, 500);
  canvas.id("p5-canvas");
  canvas.parent("p5-canvas-container");
  x = width / 2;
  y = random(0, height);

  for (let i = 0; i < 20; i++) {
    bubbles.push({
      x: random(width),
      y: random(height),
      size: random(5, 15),
      speed: random(0.5, 2),
    });
  }
}

function draw() {
  let r = map(sin(frameCount * 0.02), -1, 1, 0, 100);
  let g = map(sin(frameCount * 0.03), -1, 1, 100, 200);
  let b = map(sin(frameCount * 0.01), -1, 1, 200, 255);
  background(r, g, b, 50);

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
  for (let bubble of bubbles) {
    bubble.y -= bubble.speed;
    if (bubble.y < -20) {
      bubble.y = height + 20;
      bubble.x = random(width);
    }
    fill(255, 255, 255, 100);
    noStroke();
    ellipse(bubble.x, bubble.y, bubble.size);
  }
  x = width / 4 + 260 * noise(frameCount * m);
  y = height / 4 + 260 * noise(frameCount * n);
  let dynamicBlue = map(sin(frameCount * 0.05), -1, 1, 30, 255);
  // let Offset = map(cos(frameCount * 0.05), -1, 1, 100, 255);
  noStroke();
  fill(0, 0, dynamicBlue);
  circle(x, y, j);
  // console.log(frameCount)

  if (keyIsPressed) {
    m = 0.005;
    n = 0.01;
  } else {
    m = 0.008;
    n = 0.03;
  }

  //Feed it with the key pressed
  if (mouseIsPressed) {
    noStroke();
    fill(random(0, 255), random(0, 255), random(0, 255));
    circle(mouseX, mouseY, 10);
    j = j + 3;
  }
  circle(x, y, j);

  //Do Not Feed Too Much
  if (j > 500) {
    text("💀DEAD!💀", width / 2 - 60, height / 2);
    j = 0;
    background(0);
  }
  if (j >= 50) {
    fill(255, 175, 150);
    circle(
      x + 180 * sin(frameCount * 0.03),
      y + 180 * cos(frameCount * 0.03),
      j * 0.5
    );
  }
}
