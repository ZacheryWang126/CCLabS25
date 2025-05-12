let pages = [];
let currentPage = 0;
let bgm;
let muteButton;
let speechRec;
let micInput = '';
let showResponse = false;

function preload() {
  // 加载故事插图
  pages[0] = {
    img: loadImage('https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'),
    text: "故事一：他生活在东亚，面对父母压力，与一位女同性恋结婚。"
  };
  pages[1] = {
    img: loadImage('https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'),
    text: "生活冲突不断，最终他的生活陷入破裂。"
  };
  pages[2] = {
    img: loadImage('https://upload.wikimedia.org/wikipedia/commons/4/49/LGBTQ_Flag.svg'), // 理想世界图
    text: "这是一个同性恋者拥有平等权利的世界。\n点击麦克风，说出你想说的话。"
  };

  // 背景音乐
  soundFormats('mp3', 'ogg');
  bgm = loadSound('https://cdn.pixabay.com/download/audio/2022/10/18/audio_a0d23bb651.mp3?filename=ambient-piano-112509.mp3');
}

function setup() {
  createCanvas(800, 600);
  textAlign(CENTER, CENTER);
  textSize(20);
  imageMode(CENTER);
  
  // 背景音乐播放
  bgm.loop();

  // 静音按钮
  muteButton = createButton('🔈 静音');
  muteButton.position(20, 20);
  muteButton.mousePressed(toggleMute);

  // 语音识别初始化
  speechRec = new p5.SpeechRec('en-US', gotSpeech);
  speechRec.continuous = false;
  speechRec.interimResults = false;
}

function draw() {
  background(240);

  let p = pages[currentPage];
  image(p.img, width / 2, height / 2 - 80, 300, 300);

  fill(50);
  textSize(20);
  text(p.text, width / 2, height - 130);

  if (currentPage === 2) {
    drawMicButton();

    if (showResponse) {
      fill(0, 102, 153);
      textSize(18);
      text("你说了： " + micInput, width / 2, height - 60);
      text("人物回应：谢谢你，我听到了。", width / 2, height - 30);
    }
  } else {
    fill(100);
    textSize(14);
    text("点击以继续故事", width / 2, height - 30);
  }
}

function mousePressed() {
  if (currentPage < 2) {
    currentPage++;
  }
}

function toggleMute() {
  if (bgm.isPlaying()) {
    bgm.pause();
    muteButton.html('🔇 播放');
  } else {
    bgm.play();
    muteButton.html('🔈 静音');
  }
}

function drawMicButton() {
  fill(200);
  rect(width / 2 - 50, height - 100, 100, 40, 10);
  fill(0);
  textSize(16);
  text("🎤 说话", width / 2, height - 80);
}

function mouseClicked() {
  // 点击麦克风区域启动语音识别
  if (currentPage === 2 && mouseX > width / 2 - 50 && mouseX < width / 2 + 50 &&
      mouseY > height - 100 && mouseY < height - 60) {
    userStartAudio();
    speechRec.start();
    showResponse = false;
  }
}

function gotSpeech() {
  if (speechRec.resultValue) {
    micInput = speechRec.resultString;
    showResponse = true;
  }
}