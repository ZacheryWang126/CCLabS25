let stage = 1; // Current story stage (1 to 5)
let person1, person2, parent1, parent2, child; // Characters: person1, person2, parents, and child
let isHandInHand = false; // Are they holding hands?
let fadeAlpha = 0; // Fade effect of the text
let bgColor; // Background color for each stage
let isHeart = false; // Whether there is a heart-throb in stage 1
let leaves = []; // Leaves
let clouds = []; // Clouds in the sky


let textToShow = ''; // Text to be displayed for each stage

let groundLevel; // Y position of the ground

// stage 2

let screenCracks = []; // Screen cracks for stage 2
let moveEnabled = false; // Flag to control if movement is enabled
let isAscending = false; // For stage 4 ascending animation

let houseX, houseY; // Position of the house in stage 5

let romanticMusic, sadMusic, happyMusic, manCryMusic, womenCryMusic, rainMusic;
let bgmMusic; // 添加BGM变量



let groups = []; // Store group centers to avoid overlap



// rain
let raindrops = [];
let rainDensity = 5; // Initial density
let rainSpeed = 2; // Initial falling speed
let timeFactor = 0; // Time factor

//
let photoButtonX, photoButtonY, photoButtonWidth, photoButtonHeight;
let photoLayer;
let photoAlpha = 0;
let photoScale = 0.2;
let photoAngle = -0.1;
const maxScale = 0.5; // Maximum scale
let targetX, targetY;




//love heart
let hearts = [];

//brokenHeart
// 创建一个爱心，位置、大小都可自定义
let brokenHeart;

//stage3
let stars = [];
let rainbow, door, moon, ball;
let start1, start2, start3;

let music1;
let music2;
let music3;

function preload() {
    romanticMusic = loadSound('assets/romantic.mp3'); // Romantic music for stage 1 (mp3)
    sadMusic = loadSound('assets/sad.mp3'); // Sad music for stages 2 and 3 (wav)
    happyMusic = loadSound('assets/happy.mp3'); // Happy music for stage 4 (wav)
    manCryMusic = loadSound('assets/manCry.mp3'); // For stage 2
    womenCryMusic = loadSound('assets/womenCry.wav'); // For stage 2
    rainMusic = loadSound('assets/rain.mp3'); // For stage 2
    bgmMusic = loadSound('assets/BGM.mp3'); // 加载BGM

    music1 = loadSound('assets/1.mp3');
    music2 = loadSound('assets/2.mp3');
    music3 = loadSound('assets/3.mp3');
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    //love heart
    angleMode(DEGREES);
    noStroke();

    //broken heart
    brokenHeart = new BrokenHeart(width / 2, height / 2 + 20, 1.0); // 1.0 = 默认大小

    //stage3

    // Create 200 stars
    for (let i = 0; i < 200; i++) {
        stars.push(new Star());
    }
    start1 = new Star();
    start1.x = width * 0.5;
    start1.y = height * 0.2;
    start1.size = 10;
    stars.push(start1);

    start2 = new Star();
    start2.x = width * 0.2;
    start2.y = height * 0.7;
    start2.size = 10;
    stars.push(start2);


    start3 = new Star();
    start3.x = width * 0.3;
    start3.y = height * 0.1;
    start3.size = 10;
    stars.push(start3);
    // Initialize other elements
    rainbow = new RainbowPath();
    door = new Door();
    moon = new Moon();
    ball = new Ball(rainbow);

    ///////////////////////////
    targetX = windowWidth / 10;
    targetY = windowHeight / 10;

    //
    sadMusic = loadSound('assets/sad.wav'); // Sad music for stages 2 and 3 (wav)
    happyMusic = loadSound('assets/happy.wav'); // Happy music for stage 4 (wav)
    bgColor = color(135, 206, 250); // Blue sky background
    groundLevel = windowHeight - windowHeight / 5; // Ground level
    person1 = new Person(width / 8, groundLevel, color(100, 200, 255), "young", false, "happy"); // Person1 on the left
    person2 = new Person(7 * width / 8, groundLevel, color(100, 200, 255), "young", true, "happy"); // Person2 on the right
    parent1 = new Person(width / 2 - 200, groundLevel, color(200, 100, 100), "parent", true, "angry"); // Parent in stage 2
    parent2 = new Person(width / 2 + 200, groundLevel, color(100, 100, 200), "parent", true, "angry");
    child = new Person(width / 2, groundLevel, color(255, 255, 100), "children", false, "happy"); // Child in stage 5

    for (let i = 0; i < 10; i++) {
        clouds.push(new Cloud(i * width / 4 + 100, random(0, windowHeight / 4)));
    }


    // Screen cracks for stage 2
    for (let i = 0; i < 5; i++) {
        screenCracks.push(new ScreenCrack(random(width / 4, 3 * width / 4), random(height / 2, height), random(50, 150)));
    }


    // Position of the house in stage 5
    houseX = width / 2 - 100;
    houseY = groundLevel - windowHeight / 7;




}



class Raindrop {
    constructor() {
        this.x = random(width);
        this.y = random(-100, -10);
        this.length = random(10, 20);
        this.speed = rainSpeed;
        this.alpha = random(100, 200); // 添加透明度变化
    }

    fall() {
        this.y += this.speed;
    }

    show() {
        stroke(200, 200, 255, this.alpha); // 雨滴颜色
        strokeWeight(1.5);
        line(this.x, this.y, this.x, this.y + this.length);
    }

    offScreen() {
        return this.y > height;
    }
}


function drawSunStageOne() {
    fill(255, 204, 0);
    noStroke();
    ellipse(windowWidth / 15, windowHeight / 10, windowWidth / 15, windowWidth / 15)
}

// Class for the colored dots

class Heart2 {
    constructor(x, y, size, angle) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.angle = angle;
        this.xOffset = 0; // Offset on the x-axis
    }

    display() {
        push();
        translate(this.x, this.y);
        rotate(radians(this.angle));
        scale(this.size / 50);
        this.customHeart();
        pop();
    }

    customHeart() {
        this.xOffset += 0.5; // Increase the offset
        let y = 4 * (cos(this.xOffset) + sin(this.xOffset / 2)) + windowWidth / 15; // Calculate the y value
        noStroke();
        fill(255, 0, 0);
        square(0, 0, y); // Draw the square
        circle(y / 2, 0, y); // Draw the circle
        circle(0, y / 2, y); // Draw the circle
    }
}

class Heart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.baseScale = 0;
        this.colors = [
            '#f8bbd0',
            '#f9cbd9',
            '#fbcde0',
            '#fdd1e8',
            '#fcd5eb',
            '#fbcfea',
            '#f9c4e0',
            '#f7b8d5'
        ];
    }

    update() {
        this.baseScale += 0.2;

    }

    display() {
        push();
        translate(this.x, this.y);
        for (let i = this.colors.length - 1; i >= 0; i--) {
            let scaleFactor = this.baseScale + i * 0.4;

            push();
            scale(scaleFactor);
            fill(this.colors[i]);
            this.drawHeartShape();
            pop();
        }
        pop();
    }

    drawHeartShape() {
        beginShape();
        for (let angle = 0; angle < 360; angle++) {
            let x = 16 * pow(sin(angle), 3);
            let y = -(13 * cos(angle) - 5 * cos(2 * angle) - 2 * cos(3 * angle) - cos(4 * angle));
            vertex(x * 5, y * 5);
        }
        endShape(CLOSE);
    }
}

let fadeAmt = 0;

function draw() {


    if (stage === 1) {
        happyMusic.stop();
        manCryMusic.stop();
        womenCryMusic.stop();
        sadMusic.stop();
        rainMusic.stop();
        drawStage1();

    } else if (stage === 2) {
        happyMusic.stop();
        romanticMusic.stop();

        // Gradually darken the background color as fadeAmt increases over time
        background(lerpColor(bgColor, color(0, 0, 0, 100), fadeAmt));

        // Increase fadeAmt gradually until it reaches 1 to become completely black
        if (fadeAmt < 1) {
            fadeAmt += 0.01; // Adjust this increment to control the darkening speed
        }
        timeFactor += 0.01; // Time progresses
        // Apply limits; otherwise, rainSpeed would keep increasing with timeFactor
        if (timeFactor <= 10) {
            rainSpeed = map(timeFactor, 0, 10, 2, 15); // Control the falling speed using the map function
        }
        // Apply limits; otherwise, rainDensity would keep decreasing with timeFactor
        if (timeFactor <= 10) {
            rainDensity = map(timeFactor, 0, 10, 60, 2); // Control the raindrop density using the map function
        }


        if (frameCount % int(rainDensity) == 0) {
            raindrops.push(new Raindrop());
        }

        // Display and update the raindrops
        for (let i = raindrops.length - 1; i >= 0; i--) {
            raindrops[i].fall();
            raindrops[i].show();
            if (raindrops[i].offScreen()) {
                raindrops.splice(i, 1); // Remove the raindrop that is off the screen
            }
        }
        drawGround();

        displayInstructions();

        drawStage2();
    } else if (stage === 3) {
        push();
        happyMusic.stop();
        manCryMusic.stop();
        womenCryMusic.stop();
        sadMusic.stop();
        rainMusic.stop();

        // 播放BGM
        if (!bgmMusic.isPlaying()) {
            bgmMusic.loop();
            bgmMusic.setVolume(0.3); // 设置音量为30%
        }
        if((music1.isPlaying() == false) && (music2.isPlaying() == false) && (music3.isPlaying() == false)){
            bgmMusic.setVolume(0.5); // 设置音量为30%
        }

        background(10, 5, 20);

        // 先绘制普通星星
        for (let star of stars) {
            if (star !== start1 && star !== start2 && star !== start3) {
                star.update();
                star.display();
            }
        }

        // 绘制可点击的星星（亮黄色）
        if (start1) {
            start1.update();
            start1.displaySpecial();
        }
        if (start2) {
            start2.update();
            start2.displaySpecial();
        }
        if (start3) {
            start3.update();
            start3.displaySpecial();
        }

        rainbow.display();
        door.display();
        ball.update();
        ball.display();
        moon.display();

        // 添加提示文字
        fill(255, 255, 255, 200);
        textSize(24);
        textAlign(CENTER);
        text("Click the brightest stars!", width / 2, height * 0.1);

        pop();
    }
    displayStoryText(); // Display the text with the fade-in effect
}







function drawStage1() {
    // 绘制天空背景
    background(135, 206, 235); // 更亮的蓝色天空

    // 绘制太阳
    drawSunStageOne();

    // 绘制云朵
    for (let cloud of clouds) {
        cloud.update();
        cloud.display();
    }

    // 绘制教学楼
    drawSchoolBuilding();

    // 绘制操场
    drawPlayground();

    // 绘制树木
    drawTrees();

    // 绘制地面
    drawGround();

    // 绘制人物和互动元素
    if (moveEnabled && isHeart == false) {
        person1.speed = 10;
        person2.speed = 10;
        person1.update(1);
        person2.update(-1);
        if (dist(person1.x, person1.y, person2.x, person2.y) < 100) {
            isHandInHand = true;
            textToShow = "Two boys fall in love.";
            person1.x = person2.x - 50;
            moveEnabled = false;
            if (!romanticMusic.isPlaying())
                romanticMusic.play();
            isHeart = true;
        }
    }

    // 绘制人物
    person1.display();
    person2.display();

    if (isHandInHand) {
        stroke(255, 100, 100);
        strokeWeight(5);
        line(person1.x + 20, person1.y, person2.x - 20, person2.y);
    }

    // 添加提示文字
    fill(0, 0, 0, 200);
    textSize(24);
    textAlign(CENTER);
    text("Press 2 & 3 to proceed the story.", width / 2, height * 0.9);

    displayInstructions();
}

// 绘制教学楼
function drawSchoolBuilding() {
    // 主楼
    fill(240, 240, 240);
    rect(width * 0.3, height * 0.2, width * 0.4, height * 0.4);

    // 窗户
    fill(200, 200, 255);
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 4; j++) {
            rect(width * 0.35 + j * width * 0.1, height * 0.25 + i * height * 0.1, width * 0.05, height * 0.05);
        }
    }

    // 屋顶
    fill(180, 180, 180);
    triangle(width * 0.3, height * 0.2, width * 0.7, height * 0.2, width * 0.5, height * 0.15);
}

// 绘制操场
function drawPlayground() {
    // 操场地面
    fill(100, 200, 100);
    ellipse(width * 0.5, height * 0.7, width * 0.3, height * 0.2);

    // 跑道
    noFill();
    stroke(200, 200, 200);
    strokeWeight(5);
    ellipse(width * 0.5, height * 0.7, width * 0.35, height * 0.25);
}

// 绘制树木
function drawTrees() {
    // 左侧树
    fill(139, 69, 19);
    rect(width * 0.1, height * 0.5, width * 0.02, height * 0.1);
    fill(34, 139, 34);
    ellipse(width * 0.1, height * 0.45, width * 0.05, height * 0.08);

    // 右侧树
    fill(139, 69, 19);
    rect(width * 0.9, height * 0.5, width * 0.02, height * 0.1);
    fill(34, 139, 34);
    ellipse(width * 0.9, height * 0.45, width * 0.05, height * 0.08);
}

// Stage 2: Parents separate them (no additional interaction)
function drawStage2() {
    // 绘制室内背景
    background(40, 40, 60); // 深色室内背景

    // 绘制窗户
    drawWindow();

    // 绘制雨滴
    for (let i = raindrops.length - 1; i >= 0; i--) {
        raindrops[i].fall();
        raindrops[i].show();
        if (raindrops[i].offScreen()) {
            raindrops.splice(i, 1);
        }
    }

    // 绘制沙发
    drawSofa();

    // 绘制地面
    drawIndoorGround();

    // 人物移动
    if (moveEnabled) {
        parent1.update(-0.5);
        parent2.update(0.5);
        person1.x = width / 4;
        person2.x = 3 * width / 4;
    }

    // 检查人物与父母的接触
    if (dist(parent1.x, parent1.y, person1.x, person1.y) < 50 || dist(parent2.x, parent2.y, person2.x, person2.y) < 50) {
        textToShow = "Life took a sharp turn when family expectations tore them apart.";
    }

    // 显示人物
    parent1.display();
    parent2.display();
    person1.clr = color(100, 200, 255);
    person1.display();
    person2.display();

    displayInstructions();
}

// 绘制窗户
function drawWindow() {
    // 窗户框架
    fill(80, 80, 100);
    rect(width * 0.7, height * 0.2, width * 0.2, height * 0.3);

    // 窗户玻璃
    fill(100, 100, 150, 100);
    rect(width * 0.71, height * 0.21, width * 0.18, height * 0.28);

    // 窗框
    stroke(60, 60, 80);
    strokeWeight(3);
    line(width * 0.7, height * 0.35, width * 0.9, height * 0.35);
    line(width * 0.8, height * 0.2, width * 0.8, height * 0.5);
}

// 绘制沙发
function drawSofa() {
    // 沙发主体
    fill(100, 80, 60);
    rect(width * 0.2, height * 0.6, width * 0.3, height * 0.15);

    // 沙发靠背
    fill(90, 70, 50);
    rect(width * 0.2, height * 0.55, width * 0.3, height * 0.05);

    // 沙发扶手
    fill(90, 70, 50);
    rect(width * 0.2, height * 0.6, width * 0.05, height * 0.15);
    rect(width * 0.45, height * 0.6, width * 0.05, height * 0.15);
}

// 绘制室内地面
function drawIndoorGround() {
    // 木地板
    noStroke();
    fill(60, 40, 20);
    rect(0, groundLevel, width, height - groundLevel);

    // 木地板纹理
    stroke(40, 25, 15);
    strokeWeight(1);
    for (let i = 0; i < width; i += 30) {
        line(i, groundLevel, i, height);
    }

    // 添加一些阴影效果
    fill(0, 0, 0, 20);
    rect(0, groundLevel, width, height - groundLevel);
}

// Display instructions for the user
function displayInstructions() {
    // fill (255);
    // textSize (16);
    // textAlign (LEFT);
    // text ("Press 1-5 to navigate through the story, click to interact", 20, 30);
}

// Text fade-in effect
function displayStoryText() {
    if (textToShow !== '') {
        noStroke();
        fadeAlpha = min(fadeAlpha + 1, 255);
        if (stage === 1 && textToShow === "Two boys fall in love.") {
            fill(255, 105, 180, fadeAlpha); // 粉色
        } else {
            fill(255, fadeAlpha);
        }
        textSize(windowWidth / 50);
        textAlign(CENTER);
        text(textToShow, windowWidth / 2, windowHeight / 3);
    }
}


// Handle keyboard input
function keyPressed() {
    if (key === '1') {
        music1.stop();
        music2.stop();
        music3.stop();
        bgmMusic.stop(); // 停止BGM
        bgColor = color(135, 206, 250); // Blue sky background
        resetStage(1);
        hearts = [];
    }


    if (key === '2') {
        music1.stop();
        music2.stop();
        music3.stop();
        bgmMusic.stop(); // 停止BGM
        parent1 = new Person(width / 2 - 200, groundLevel, color(200, 100, 100), "parent", true, "angry"); // Parent in stage 2
        parent2 = new Person(width / 2 + 200, groundLevel, color(100, 100, 200), "parent", true, "angry");

        sadMusic.loop(); // Play sad music
        rainMusic.loop(); // Play sad music
        sadMusic.setVolume(0.2);
        rainMusic.setVolume(0.2);
        raindrops = [];
        rainDensity = 5; // Initial density
        rainSpeed = 2;   // Initial falling speed
        timeFactor = 0;  // Time factor
        resetStage(2);
    }


    if (key === '3') {

        stage = 3;
        textToShow = "";
        // Create 200 stars
        for (let i = 0; i < 200; i++) {
            stars.push(new Star());
        }

        // Initialize other elements
        rainbow = new RainbowPath();
        door = new Door();
        moon = new Moon();
        ball = new Ball(rainbow);
    }


    if (key === '4') {
        bgmMusic.stop(); // 停止BGM
        fadeAmt = 0;
        if (!happyMusic.isPlaying()) {
            happyMusic.loop();
        }

        resetStage(4);
    }
    if (key === '5') {
        bgmMusic.stop(); // 停止BGM
        fadeAmt = 0;
        if (!happyMusic.isPlaying()) {
            happyMusic.loop();
        }
        resetStage(5);
    }
}


function mouseDragged() {
    if (stage == 2) {
        person1.dragged(mouseX, mouseY);
        person2.dragged(mouseX, mouseY);
    }
}

function mouseReleased() {
    if (stage == 2) {
        person1.released();
        person2.released();
    }

}

// Handle mouse interaction
function mousePressed() {
    if (stage === 1) {
        moveEnabled = true; // Enable movement for the first stage
        leaves.push({
            x: mouseX,
            y: 0,
            angle: random(TWO_PI),
            wobbleFrequency: random(0.05, 0.1) // Random initial sway frequency
        });
    } else if (stage === 2) {
        person1.pressed(mouseX, mouseY);
        person2.pressed(mouseX, mouseY);
        moveEnabled = true; // Enable random movement within half regions
    } else if (stage === 3) {
        if (start1.checkClick()) {
            music1.stop();
            music2.stop();
            music3.stop();
            music1.play();
            bgmMusic.setVolume(0.1); // 设置音量为30%
        }
        if (start2.checkClick()) {
            music1.stop();
            music2.stop();
            music3.stop();
            music2.play();
            bgmMusic.setVolume(0.1); // 设置音量为30%
        }
        if (start3.checkClick()) {
            music1.stop();
            music2.stop();
            music3.stop();
            music3.play();
            bgmMusic.setVolume(0.1); // 设置音量为30%
        }
        
    }
}

// Reset the stage and character positions
function resetStage(newStage) {
    if (newStage == 1) {

        textToShow = "";
        person1 = new Person(width / 8, groundLevel, color(255, 100, 200), "young", false, "happy"); // Person on the left
        person2 = new Person(7 * width / 8, groundLevel, color(100, 200, 255), "young", true, "happy"); // Person on the right
        moveEnabled = true; // Enable movement for the first stage
    }

    if (newStage == 2) {

        textToShow = "Due to the lack of understanding from their family and society,\n" +
            " they faced discrimination, and ultimately, under pressure, were forced to part ways.";
        person1 = new Person(width / 8, groundLevel, color(255, 100, 200), "young", false, "cry"); // Person on the left
        person2 = new Person(7 * width / 8, groundLevel, color(100, 200, 255), "young", true, "cry"); // Person on the right
    }


    if (newStage == 4) {
        person1 = new Person(width / 8, groundLevel, color(255, 100, 200), "young", false, "happy"); // Person on the left
        person2 = new Person(7 * width / 8, groundLevel, color(100, 200, 255), "young", true, "happy"); // Person on the right
        moveEnabled = true;
    }


    fadeAmt = 0;
    stage = newStage;
    moveEnabled = false;
    isHandInHand = false;
    isAscending = false;
    fadeAlpha = 0;
    isHeart = false;
    person1.x = width / 8;
    person2.x = 7 * width / 8;
    person1.y = groundLevel;
    person2.y = groundLevel;
    if (newStage == 5) {
        person1.x = houseX + 40;
        person2.x = houseX + 160;
        child.x = houseX + 100;
        person1.y = houseY + 150;
        person2.y = houseY + 150;
        child.y = houseY + 150;
    }
    moveEnabled = true;
}

// Draw the ground
function drawGround() {
    if (stage === 2) {
        // 绘制深色地面
        noStroke();

        // 地面主体
        fill(30, 30, 50);
        rect(0, groundLevel, width, height - groundLevel);

        // 添加一些随机的深色纹理
        for (let i = 0; i < 50; i++) {
            let x = random(width);
            let y = random(groundLevel, height);
            let size = random(5, 15);
            fill(20, 20, 40, 100);
            ellipse(x, y, size, size);
        }

        // 添加一些水洼效果
        for (let i = 0; i < 10; i++) {
            let x = random(width);
            let y = random(groundLevel, height - 50);
            let size = random(30, 80);
            fill(40, 40, 80, 50);
            ellipse(x, y, size, size);
        }

        // 添加一些雨滴溅起的效果
        for (let i = 0; i < 20; i++) {
            let x = random(width);
            let y = random(groundLevel, groundLevel + 20);
            let size = random(2, 5);
            fill(200, 200, 255, 100);
            ellipse(x, y, size, size);
        }
    } else {
        // 其他场景保持原来的地面效果
        noStroke();
        fill("#783f04");
        rect(0, groundLevel, width, height - groundLevel);
    }
}

// Draw the house for stage 5
function drawHouse() {
    fill(200, 150, 100);
    rect(houseX, houseY, 200, 150); // House body
    fill(150, 80, 60);
    triangle(houseX, houseY, houseX + 100, houseY - 100, houseX + 200, houseY); // Roof
}

// Person class (stick figures)
class Person {
    constructor(x, y, clr, identity, isLeft, state) {
        this.x = x;
        this.y = y;
        this.clr = clr;
        this.speed = 2;
        this.size = windowWidth / 40;
        this.isLeft = isLeft;
        this.identity = identity;
        this.state = state;
        this.trembleOffset = 0; // Add tremble offset for stage 2
        this.swayAngle = 0; // Add sway angle for stage 2
        this.jumpTimer = 0; // Add jump timer for stage 2
        this.isJumping = false; // Add jumping state for stage 2

        this.velocity = 0; // Vertical velocity
        this.gravity = 1; // Gravity acceleration
        this.jumpForce = -10; // Initial upward jump velocity

        if (this.identity == "parent") {
            this.size *= 2;
        }

        if (this.identity == "young") {
            this.size;
        }

        if (this.identity == "children") {
            this.size /= 2;
            this.jumpForce = -3; // Initial upward jump velocity
        }
    }

    jump() {
        this.velocity += this.gravity; // Add gravitational acceleration
        this.y += this.velocity; // Update the y position

        // Reverse jump
        if (this.y >= groundLevel - this.size / 2) { // Bounce at the bottom
            this.y = groundLevel - this.size / 2;
            this.velocity = this.jumpForce; // Reset the upward velocity
        } else if (this.y <= this.size / 2) { // Bounce at the top
            this.y = this.size / 2;
            this.velocity = -this.velocity; // Reverse the velocity
        }
    }

    update(dir) {
        this.x += dir * this.speed; // Move left or right
        this.x = constrain(this.x, this.size / 2, width - this.size / 2);
    }

    display() {
        if (stage == 1) {
            this.jump();
        }

        if (stage == 2) {
            // Enhanced emotional movements for stage 2
            this.trembleOffset = sin(frameCount * 15) * 4; // More intense trembling
            this.swayAngle = sin(frameCount * 3) * 0.2; // More pronounced swaying
            
            // Add jumping behavior
            if (!this.isJumping) {
                this.jumpTimer++;
                if (this.jumpTimer > 60) { // Jump every 60 frames
                    this.isJumping = true;
                    this.velocity = this.jumpForce;
                    this.jumpTimer = 0;
                }
            }
            
            if (this.isJumping) {
                this.velocity += this.gravity;
                this.y += this.velocity;
                
                // Reset jump when back on ground
                if (this.y >= groundLevel - this.size / 2) {
                    this.y = groundLevel - this.size / 2;
                    this.isJumping = false;
                }
            }

            push(); // Save the current transformation state
            translate(this.x, this.y);
            rotate(this.swayAngle);
            translate(-this.x, -this.y);
            this.x += this.trembleOffset;
        }

        if (stage == 4) {
            this.jump();
        }

        if (stage == 5) {
            this.jump();
        }

        if (this.isDragging) {
            strokeWeight(2);
            fill("red");
            textSize(50);
            text("no!  no!  no!", this.x + this.size, this.y - this.size);
        }

        if (stage == 3 && mouseIsPressed) {
            noStroke();
            strokeWeight(2);
            fill("red");
            textSize(50);
            text("I miss you!", this.x + this.size, this.y - this.size);
        }
        if (this.state == "happy") {
            this.isHappy();
        }
        if (this.state == "cry") {
            this.isCry();
        }

        if (stage == 2) {
            pop(); // Restore the transformation state
        }

        if (this.state == "angry") {
            // Body
            noStroke();
            fill(this.clr);
            ellipse(this.x, this.y, this.size);

            // Left eye
            fill(255);
            ellipse(this.x - this.size / 6, this.y - this.size / 5, this.size / 4, this.size / 5);

            // Right eye
            fill(255);
            ellipse(this.x + this.size / 6, this.y - this.size / 5, this.size / 4, this.size / 5);

            // Pupil
            fill(0);
            ellipse(this.x - this.size / 7, this.y - this.size / 5, this.size / 10, this.size / 10); // Left pupil
            ellipse(this.x + this.size / 7, this.y - this.size / 5, this.size / 10, this.size / 10); // Right pupil

            // Eyebrow
            stroke(0);
            strokeWeight(3);
            line(this.x - this.size / 4, this.y - this.size / 3, this.x - this.size / 8, this.y - this.size / 4); // Left eyebrow
            line(this.x + this.size / 8, this.y - this.size / 4, this.x + this.size / 4, this.y - this.size / 3); // Right eyebrow

            // Angry mouth
            noFill();
            stroke(0);
            strokeWeight(2);
            arc(this.x, this.y + this.size / 5, this.size / 4, this.size / 6, PI + QUARTER_PI, TWO_PI - QUARTER_PI); // Downward curved mouth

        }

    }

    isCry() {
        // Eye part
        noStroke();
        fill(this.clr);


        ellipse(this.x, this.y, this.size);

        if (!this.isLeft) {
            fill(255);
            ellipse(this.x + this.size / 4, this.y - this.size / 4, this.size / 4, this.size / 5); // Eye
            fill(0);
            ellipse(this.x + this.size / 3, this.y - this.size / 4, this.size / 8, this.size / 8); // Pupil

            // Add tear part
            fill(0, 0, 255, 150); // Blue, with transparency
            noStroke();
            ellipse(this.x + this.size / 3, this.y - this.size / 8, this.size / 10, this.size / 5); // First tear
            ellipse(this.x + this.size / 3.5, this.y, this.size / 12, this.size / 6); // Second tear

            // Crying face mouth part
            noFill();
            stroke(0);
            strokeWeight(2);
            arc(this.x + this.size / 3, this.y + this.size / 4, this.size / 6, this.size / 8, PI, TWO_PI, CHORD); // Downward arc crying face

        } else {
            fill(255);
            ellipse(this.x - this.size / 4, this.y - this.size / 4, this.size / 4, this.size / 5); // Eye
            fill(0);
            ellipse(this.x - this.size / 3, this.y - this.size / 4, this.size / 8, this.size / 8); // Pupil

            // Add tear part
            fill(0, 0, 255, 150); // Blue, with transparency
            noStroke();
            ellipse(this.x - this.size / 3, this.y - this.size / 8, this.size / 10, this.size / 5); // First tear
            ellipse(this.x - this.size / 3.5, this.y, this.size / 12, this.size / 6); // Second tear

            // Crying face mouth part
            noFill();
            stroke(0);
            strokeWeight(2);
            arc(this.x - this.size / 3, this.y + this.size / 4, this.size / 6, this.size / 8, PI, TWO_PI, CHORD); // Downward arc crying face
        }

    }

    isHappy() {
        noStroke();
        fill(this.clr);


        ellipse(this.x, this.y, this.size);

        if (!this.isLeft) {
            fill(255);
            ellipse(this.x + this.size / 4, this.y - this.size / 4, this.size / 4, this.size / 5); // Eye
            fill(0);
            ellipse(this.x + this.size / 3, this.y - this.size / 4, this.size / 8, this.size / 8); // Pupil
            // Add mouth
            noFill();
            stroke(0);
            strokeWeight(2);
            fill(255);
            arc(this.x + this.size / 3, this.y + this.size / 8, this.size / 6, this.size / 8, 0, PI, CHORD); // Closed arc mouth
        } else {
            fill(255);
            ellipse(this.x - this.size / 4, this.y - this.size / 4, this.size / 4, this.size / 5); // Eye
            fill(0);
            ellipse(this.x - this.size / 3, this.y - this.size / 4, this.size / 8, this.size / 8); // Pupil
            // Add mouth
            noFill();
            stroke(0);
            strokeWeight(2);
            fill(255);
            arc(this.x - this.size / 3, this.y + this.size / 8, this.size / 6, this.size / 8, 0, PI, CHORD); // Closed arc mouth
        }

    }

    // Mouse press detection
    pressed(mx, my) {

        let d = dist(mx, my, this.x, this.y);
        if (d < this.size / 2) {

            if (stage == 2) {
                if (this == person1) {

                    if (!womenCryMusic.isPlaying()) {

                        womenCryMusic.play();
                    }

                }

                if (this == person2) {
                    if (!manCryMusic.isPlaying()) {
                        manCryMusic.play();
                    }

                }
            }


            this.isDragging = true;
        }
    }

    // Update position during dragging
    dragged(mx, my) {
        if (this.isDragging) {

            this.x = mx;
            this.y = my;


        }
    }

    // Stop dragging when mouse is released
    released() {
        this.isDragging = false;
    }
}

class Text {
    constructor(x, y, content, duration, angle) {
        this.x = x;
        this.y = y;
        this.content = content;
        this.duration = duration * 1000; // Convert to milliseconds
        this.startTime = millis();
        this.alpha = 0; // Transparency
        this.angle = angle;
        this.size = 60; // Font size
    }

    update() {
        let elapsed = millis() - this.startTime;

        // Gradually show
        if (elapsed < this.duration / 2) {
            this.alpha = map(elapsed, 0, this.duration / 2, 0, 255);
        }
        // Gradually disappear
        else if (elapsed < this.duration) {
            this.alpha = map(elapsed, this.duration / 2, this.duration, 255, 0);
        }
    }

    display() {
        textSize(this.size);
        fill(255, this.alpha);
        push();
        translate(this.x, this.y);
        rotate(this.angle);
        text(this.content, 0, 0);
        pop();
    }
}

// Tree class (for stages 1 and 3)


// Cloud class
class Cloud {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = random(windowWidth * 0.01, windowWidth * 0.03); // Set the size of the cloud based on the window width
        this.speed = random(windowWidth * 0.001, windowWidth * 0.002); // Cloud movement speed relative to windowWidth
    }

    update() {
        this.x += this.speed; // Update the x position of the cloud
        // If the cloud moves out of the canvas, reappear from the left
        if (this.x > windowWidth + windowWidth / 4) {
            this.x = -100; // Set the reset position of the cloud
            this.y = random(0, windowHeight / 4); // Random height
        }
    }

    display() {
        fill(255);
        noStroke();
        ellipse(this.x, this.y, this.size + this.size / 2, this.size);
        ellipse(this.x + this.size * 0.3, this.y + this.size * 0.3, this.size + this.size / 2, this.size);
        ellipse(this.x - this.size * 0.3, this.y + this.size * 0.3, this.size + this.size / 2, this.size);
    }
}


// Screen crack class (for stage 2)
class ScreenCrack {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
    }

    display() {
        stroke(255, 50, 50, 150);
        strokeWeight(3);
        noFill();
        beginShape();
        for (let i = 0; i < 10; i++) {
            vertex(this.x + random(-this.size, this.size), this.y + random(-this.size, this.size));
        }
        endShape(CLOSE);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

// When you press the spacebar, the current contents of the canvas will be saved (as the "thumbnail.png" file) to your download folder.
// Ensure the image is added and committed to the root folder of this repository.
function keyTyped() {
    if (key === " ") {
        saveCanvas("thumbnail.png");
    }
}

class BrokenHeart {
    constructor(x, y, size = 1.0, col = '#ec407a') {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = col;

        this.broken = false;
        this.progress = 0;

        this.heartPoints = this.generateHeartPoints();
    }

    generateHeartPoints() {
        let points = [];
        for (let angle = 0; angle <= 360; angle++) {
            let x = 16 * pow(sin(angle), 3);
            let y = -(13 * cos(angle) - 5 * cos(2 * angle) - 2 * cos(3 * angle) - cos(4 * angle));
            points.push(createVector(x * 6 * this.size, y * 6 * this.size));
        }
        return points;
    }

    isLeftHalf(pt) {
        // 多频率锯齿线，决定左右边界
        let jagged = 15 * sin(pt.y / 1.5) + 8 * sin(pt.y / 0.8);
        return pt.x < pt.y * 0.3 + jagged;
    }

    break() {
        this.broken = true;
    }

    update() {
        if (this.broken && this.progress < 1) {
            this.progress += 0.01;
        }
    }

    display() {
        push();
        translate(this.x, this.y);
        fill(this.color);
        this.drawBrokenHeart(this.progress);
        pop();
    }

    drawBrokenHeart(p) {
        // 左半边
        push();
        translate(-30 * p * this.size, 40 * p * this.size);
        rotate(-20 * p);
        beginShape();
        for (let pt of this.heartPoints) {
            if (this.isLeftHalf(pt)) {
                vertex(pt.x, pt.y);
            }
        }
        endShape(CLOSE);
        pop();

        // 右半边
        push();
        translate(30 * p * this.size, 40 * p * this.size);
        rotate(20 * p);
        beginShape();
        for (let pt of this.heartPoints) {
            if (!this.isLeftHalf(pt)) {
                vertex(pt.x, pt.y);
            }
        }
        endShape(CLOSE);
        pop();
    }
}


class Star {
    constructor() {
        this.x = random(width);
        this.y = random(height);
        this.size = random(1, 3);
        this.twinkle = random(0.5, 2.5);
        this.brightness = random(50, 255);
        this.direction = random() > 0.5 ? 1 : -1;
    }

    update() {
        this.brightness += this.twinkle * this.direction;
        if (this.brightness > 255 || this.brightness < 30) {
            this.direction *= -1;
        }
    }

    display() {
        noStroke();
        fill(255, 255, 255, this.brightness);
        let sizeVariation = (this.brightness > 200) ? 1.5 : 1;
        circle(this.x, this.y, this.size * sizeVariation);
    }

    // 为可点击的星星添加特殊显示方法
    displaySpecial() {
        noStroke();
        // 添加光晕效果
        fill(255, 255, 0, 50);
        circle(this.x, this.y, this.size * 8);
        // 星星主体
        fill(255, 255, 0);
        circle(this.x, this.y, this.size * 3);
        // 闪烁效果
        fill(255, 255, 255, this.brightness);
        circle(this.x, this.y, this.size * 2);
    }

    checkClick() {
        let d = dist(mouseX, mouseY, this.x, this.y);
        return d < this.size * 4; // 增加点击范围
    }
}

class RainbowPath {
    constructor() {
        this.startX = width * 0.1;
        this.startY = height * 0.3;
        this.endX = width;
        this.endY = height * 0.75;
        this.startWidth = height * 0.15 * 0.9;
        this.endWidth = this.startWidth * 3;
    }

    display() {
        for (let i = 0; i < 7; i++) {
            let startStripeWidth = this.startWidth / 7;
            let endStripeWidth = this.endWidth / 7;
            let startOffset = map(i, 0, 6, -this.startWidth / 2, this.startWidth / 2 - startStripeWidth);
            let endOffset = map(i, 0, 6, -this.endWidth / 2, this.endWidth / 2 - endStripeWidth);
            let col = this.getColor(i);
            fill(col);
            noStroke();
            beginShape();
            vertex(this.startX, this.startY + startOffset);
            vertex(this.startX, this.startY + startOffset + startStripeWidth);
            vertex(this.endX, this.endY + endOffset + endStripeWidth);
            vertex(this.endX, this.endY + endOffset);
            endShape(CLOSE);
        }
    }

    getColor(i) {
        switch (i) {
            case 0:
                return color(255, 0, 0, 220);
            case 1:
                return color(255, 127, 0, 220);
            case 2:
                return color(255, 255, 0, 220);
            case 3:
                return color(0, 255, 0, 220);
            case 4:
                return color(0, 0, 255, 220);
            case 5:
                return color(75, 0, 130, 220);
            case 6:
                return color(148, 0, 211, 220);
        }
    }

    getPosition(t) {

        let x = lerp(this.startX, width, t);
        let y = lerp(this.startY, height - height * 0.2, t);
        return { x, y };
    }
}

class Ball {
    constructor(rainbow) {
        this.rainbow = rainbow;
        this.size = width * 0.015;
        this.position = 0;
        this.speed = 0.005;
    }

    update() {
        this.position += this.speed;
        if (this.position > 1) this.position = 0;
    }

    display() {
        let pos = this.rainbow.getPosition(this.position);

        fill(100, 200, 255);
        noStroke();
        circle(pos.x, pos.y, this.size);
    }
}

class Moon {
    constructor() {
        this.x = width * 0.85;
        this.y = height * 0.75;
        this.radius = width * 0.07;
    }

    display() {
        noStroke();
        fill(255, 255, 230, 50);
        for (let i = 3; i > 0; i--) {
            circle(this.x, this.y, this.radius * (1 + i * 0.5));
        }
        fill(255, 255, 230);
        circle(this.x, this.y, this.radius);
        fill(10, 5, 20);
        circle(this.x + this.radius * 0.4, this.y, this.radius * 0.9);
    }
}

class Door {
    constructor() {
        this.x = width * 0.1;
        this.y = height * 0.3;
        this.w = width * 0.05;
        this.h = height * 0.15;
    }

    display() {
        rectMode(CENTER);
        fill(50);
        rect(this.x, this.y, this.w, this.h);
        fill(255);
        rect(this.x, this.y, this.w * 0.8, this.h * 0.8);
        fill(255, 0, 0);
        textSize(this.w * 0.4);
        textAlign(CENTER);
        text("EXIT", this.x, this.y - this.h * 0.2);
    }
}
