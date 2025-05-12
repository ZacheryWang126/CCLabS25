let mySound;
function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  mic = new p5.AudioIn()
  mic.start()
}

function draw() {
  background(0);
  let level = mic.getLevel();
  fill(255)
  textsize(30)
  text(level, width/2, height/2)
  let s = map(level, 0, 0.1, 0, width)
  circle(width/2, weight/2, s)
}

function preload(){
  mySound = loadSound("assets/song.mp3")
}
// function mousePressed(){
// if(mySound.isPlaying()==false){
//   mySound.play()
// }
//   circle(mouseX, mouseY, 100)
// }