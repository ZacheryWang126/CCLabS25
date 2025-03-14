/*
Template for IMA's Creative Coding Lab 

Project A: Generative Creatures
CCLaboratories Biodiversity Atlas 
*/

let virus;
let plasticEaten = 0;
let isDead = false;
let bubbles = [];
let rotationAngle = 0;
let shakeAmount = 0;
let recoveryTimer = 0;
let i;

function setup() {
  //createCanvas(400, 400);
  let canvas = createCanvas(800, 500);
  canvas.id("p5-canvas");
  canvas.parent("p5-canvas-container");
  virus = new Virus();
}

function draw() {
  // i = 190*sin(0.01*frameCount)
  // sole.int(frameCount)
  background(20, 60, 180); // Water background

  if (!isDead) {
    virus.move(mouseX, mouseY);
    virus.display();
    updateBubbles();

    // Gradually recover if no new plastic is eaten
    if (plasticEaten > 0) {
      recoveryTimer++;
      if (recoveryTimer > 200) {
        // After some time, virus recovers
        plasticEaten -= 5;
        if (plasticEaten < 0) plasticEaten = 0;
        recoveryTimer = 0;
      }
    }
  } else {
    fill(255);
    textSize(20);
    text("💀 DEAD!💀", width / 2 - 60, height / 2);
  }
}

// Press any key to feed plastic
function keyPressed() {
  if (!isDead) {
    let plasticAmount = random(20, 40);
    plasticEaten += plasticAmount;
    recoveryTimer = 0; // Reset recovery timer
    if (plasticEaten > 80) {
      shakeAmount = 3; // Virus starts shaking if overfed
    }
    if (plasticEaten > 100) {
      isDead = true; // If overfed, virus dies
    } else {
      virus.releaseBubbles();
    }
  }
}

// Update floating bubbles
function updateBubbles() {
  for (let i = bubbles.length - 1; i >= 0; i--) {
    bubbles[i].move();
    bubbles[i].display();
    if (bubbles[i].y < -10) {
      bubbles.splice(i, 1);
    }
  }
}

class Virus {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
  }

  move(targetX, targetY) {
    let moveSpeed = isDead ? 0 : 0.05; // Stop moving when dead
    this.x = lerp(this.x, targetX, moveSpeed);
    this.y = lerp(this.y, targetY, moveSpeed);
  }

  display() {
    rotationAngle += 0.05; // Rotate spikes continuously
    let shakeX = random(-shakeAmount, shakeAmount);
    let shakeY = random(-shakeAmount, shakeAmount);

    push();
    translate(this.x + shakeX, this.y + shakeY);
    rotate(rotationAngle);

    stroke(0);
    if (isDead) {
      fill(100); // Turn gray if dead
    } else if (plasticEaten > 80) {
      fill(150, 50, 200); // Purple when struggling
    } else if (plasticEaten > 40) {
      fill(100, 255, 100); // Green when happy eating
    } else {
      fill(255, 0, 0); // Normal red
    }

    ellipse(0, 0, 40, 40); // Body

    // Spikes around the body
    strokeWeight(isDead ? 1 : 2);
    stroke(isDead ? 100 : 255, 0, 0);
    for (let i = 0; i < TWO_PI; i += PI / 6) {
      let x1 = cos(i) * 20;
      let y1 = sin(i) * 20;
      let x2 = cos(i) * (isDead ? 25 : 30);
      let y2 = sin(i) * (isDead ? 25 : 30);
      line(x1, y1, x2, y2);
    }

    pop();
  }

  releaseBubbles() {
    for (let i = 0; i < 3; i++) {
      bubbles.push(new Bubble(this.x, this.y));
    }
  }
}

class Bubble {
  constructor(x, y) {
    this.x = x + random(-10, 10);
    this.y = y;
    this.size = random(5, 10);
    this.speed = random(1, 3);
  }

  move() {
    this.y -= this.speed; // Move bubbles up
  }

  display() {
    fill(200, 200, 255, 150);
    noStroke();
    ellipse(this.x, this.y, this.size);
  }
}
