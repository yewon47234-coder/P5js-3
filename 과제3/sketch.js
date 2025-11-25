// 상태 변수
let winkTimer = 0;
let isWinking = false;
let isSmiling = false;
let smileTimer = 0; // 프레임 기반 미소 타이머
let isDark = false; // 배경 반전용
let offsetX = 0;    // 캐릭터 좌우 이동용
let heartY = 0;     // 하트 애니메이션용 변수

function setup() {
  createCanvas(600, 400);
  noStroke();
  rectMode(CENTER);
  textAlign(CENTER, CENTER);

  // 제출 시 사용 (주석 해제)
  saveGif('myCharacter.gif', 10);
}

function draw() {
  // 배경
  drawGradientBackground();

  // 색상 팔레트 (단색 사용)
  const skinLight = color(255, 235, 205);
  const skinDark = color(245, 200, 160);
  const hairBase = color(46, 30, 26);
  const hairHighlight = color(80, 60, 50);
  const jacketBase = color(26, 44, 74);
  const jacketHighlight = color(40, 65, 100);
  const shirtColor = color(208, 224, 240);
  const blushColor = color(255, 179, 194);
  
  // 애니메이션 변수 (frameCount 사용)
  let armSwing = sin(frameCount * 0.03) * 8;
  let eyebrowOffset = sin(frameCount * 0.02) * 3;

  // 자동 윙크 타이밍 (3초마다)
  if (frameCount % 180 === 0) {
    isWinking = true;
    winkTimer = 0;
    heartY = 0;
  }
  if (isWinking) {
    winkTimer++;
    heartY -= 1; // 하트가 위로 이동
    if (winkTimer > 15) {
      isWinking = false;
    }
  }

  // smile 타이머(프레임 기반) — 마우스로 미소 시작하면 일정 프레임 후 종료
  if (isSmiling) {
    smileTimer++;
    if (smileTimer > 30) { // 약 1초(30fps)
      isSmiling = false;
      smileTimer = 0;
    }
  }

  push();
  translate(offsetX, 0); // 좌우 이동 적용

  // 바닥 그림자
  fill(0, 0, 0, 30);
  ellipse(300, 385, 180, 20);
  
  // 그리기 구성 (함수는 아래에 정의)
  drawHairBack(hairBase, hairHighlight);
  drawArms(armSwing);
  drawJacket(jacketBase, jacketHighlight);
  drawShirt(shirtColor);

  // 손 (피부 단색)
  fill(skinLight);
  ellipse(200 - armSwing, 210, 24, 36);
  ellipse(400 + armSwing, 210, 24, 36);

  drawLogo();
  drawNeck(skinLight, skinDark);
  drawFace(skinLight, skinDark);
  drawEars(skinLight, skinDark);
  drawHairFront(hairBase, hairHighlight);
  drawEyes(isWinking, winkTimer);
  drawEyelids(isWinking);
  drawEyelashes();
  drawEyebrows(eyebrowOffset);
  drawNose(skinDark);
  drawMouth();
  drawBlush(blushColor);

  // 윙크일 때 하트 (단순 도형)
  if (isWinking) {
    drawHearts();
  }

  pop();
}


function drawGradientBackground() {
  if (isDark) {
    background(40, 45, 60);
  } else {
    // 밝은 위->아래 그라데이션 느낌 (map으로 밝기 계산)
    for (let y = 0; y < height; y++) {
      let brightness = map(y, 0, height, 255, 235); 
      stroke(brightness, brightness, 255); // 연한 푸른톤
      line(0, y, width, y);
    }
  }
  noStroke();
}


function drawHearts() {
  fill(255, 120, 170);
  noStroke();
  let x = 335; // 오른쪽 눈 근처
  let y = 140 + heartY;
  // 단순 하트 : 두 원 + 삼각형
  ellipse(x - 5, y, 10, 10);
  ellipse(x + 5, y, 10, 10);
  triangle(x - 9, y + 2, x + 9, y + 2, x, y + 15);
}


function mousePressed() {
  // 클릭하면 미소 시작(프레임 기반으로 종료)
  isSmiling = true;
  smileTimer = 0;

  // 클릭 시 즉시 윙크 트리거 및 하트 초기화
  isWinking = true;
  winkTimer = 0;
  heartY = 0;
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    offsetX -= 10;
  } else if (keyCode === RIGHT_ARROW) {
    offsetX += 10;
  } else if (key === ' ') {
    isDark = !isDark;
  }
}


function drawHairBack(baseColor, highlightColor) {
  fill(baseColor);
  ellipse(300, 180, 220, 240);
  ellipse(230, 200, 70, 160);
  ellipse(370, 210, 90, 160);
  fill(highlightColor);
  ellipse(280, 150, 60, 80);
  ellipse(320, 155, 50, 70);
  fill(0, 0, 0, 40);
  ellipse(300, 210, 200, 80);
}

function drawArms(swing) {
  fill(255);
  ellipse(200 - swing, 290, 40, 170);
  ellipse(400 + swing, 290, 40, 180);
  rect(300, 300, 180, 170, 80);
  fill(0, 0, 0, 15);
  ellipse(200 - swing, 320, 25, 80);
  ellipse(400 + swing, 320, 25, 80);
  rect(300, 340, 160, 40, 20);
}

function drawJacket(baseColor, highlightColor) {
  fill(baseColor);
  rect(300, 300, 180, 170, 70);
  fill(0, 0, 0, 25);
  ellipse(300, 360, 140, 60);
  rect(270, 285, 15, 80, 10);
  rect(330, 285, 15, 80, 10);
  stroke(0, 0, 0, 30);
  strokeWeight(1.5);
  line(240, 260, 235, 320);
  line(360, 260, 365, 320);
  noStroke();
}

function drawShirt(shirtColor) {
  fill(shirtColor);
  rect(300, 270, 40, 230, 8);
  fill(0, 0, 0, 12);
  rect(300, 280, 30, 150, 8);
}

function drawLogo() {
  fill(0, 0, 0, 40);
  textSize(38);

  text('S', 362, 302);
  fill(255);
  text('S', 360, 300);
}

function drawNeck(lightColor, darkColor) {
  fill(lightColor); 
  rect(300, 240, 40, 32, 8);
  fill(0, 0, 0, 20);
  rect(300, 248, 40, 16, 8);
}

function drawFace(lightColor, darkColor) {
  fill(lightColor); 
  ellipse(300, 160, 120, 140);
  fill(lightColor);
  ellipse(300, 140, 60, 40);
  ellipse(300, 175, 8, 12);
}

function drawEars(lightColor, darkColor) {
  fill(lightColor);
  ellipse(230, 165, 28, 36);
  ellipse(370, 165, 28, 36);
  fill(0, 0, 0, 20);
  ellipse(225, 165, 14, 22);
  ellipse(375, 165, 14, 22);
  fill(255, 215, 0);
  ellipse(230, 185, 8, 8);
  ellipse(370, 185, 8, 8);
  fill(255, 255, 200, 180);
  ellipse(232, 183, 3, 3);
  ellipse(372, 183, 3, 3);
}

function drawHairFront(baseColor, highlightColor) {
  fill(baseColor);
  rect(300, 115, 70, 70);
  rect(250, 120, 20, 70);
  rect(350, 120, 20, 70);
}

function drawEyes(winking, timer) {
  fill(255);
  ellipse(265, 170, 28, 18);
  fill(20);
  ellipse(265, 172, 10, 10);
  fill(255);
  ellipse(267, 170, 3, 3);

  if (winking && timer < 10) {
    fill(230, 190, 170);
    ellipse(335, 170, 28, 4);
    stroke(0);
    strokeWeight(1.5);
    line(320, 170, 350, 170);
    noStroke();
  } else {
    fill(255);
    ellipse(335, 170, 28, 18);
    fill(20);
    ellipse(335, 172, 10, 10);
    fill(255);
    ellipse(337, 170, 3, 3);
  }
}

function drawEyelids(winking) {
  noFill();
  stroke(90);
  strokeWeight(1.4);
  arc(265, 162, 30, 10, PI, 0);
  if (!winking) {
    arc(335, 162, 30, 10, PI, 0);
  }
  noStroke();
}

function drawEyelashes() {
  stroke(0);
  strokeWeight(2);
  line(255, 162, 250, 156);
  line(268, 162, 272, 156);
  line(325, 162, 320, 156);
  line(338, 162, 343, 156);
  noStroke();
}

function drawEyebrows(offset) {
  fill(45, 35, 30);
  rect(265, 145 + offset, 40, 5, 5);
  rect(335, 145 + offset, 40, 5, 5);
}

function drawNose(skinDark) {
  fill(skinDark); 
  ellipse(300, 180, 8, 15);
  fill(255, 255, 255, 100);
  ellipse(299, 177, 3, 6);
}

function drawMouth() {
  if (isSmiling) {
    fill(232, 90, 122);
    arc(300, 200, 40, 20, 0, PI);
  } else {
    fill(232, 90, 122);
    arc(300, 200, 34, 10, 0, PI);
  }
  fill(255, 150, 180, 120);
  ellipse(300, 198, 20, 4);
}

function drawBlush(blushColor) {
  fill(blushColor);
  ellipse(250, 185, 18, 14);
  ellipse(350, 185, 18, 14);
  fill(255, 200, 220, 100);
  ellipse(250, 185, 12, 10);
  ellipse(350, 185, 12, 10);
}