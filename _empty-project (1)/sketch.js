function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
}

function draw() {
  background(255);
  if(keyIsPressed){
    c.push(new Character(key))
  }
  for(let i=0; i < c.length; i++)
}

class Character {
  constructor(c){
    this.c = c
    this.x = random(width)
    this.y = random(height)
    this.s = random(20, 300)
  }
  display(){
    textSize(this.s)
    text(this.c, this.x, this.y)
  }

}