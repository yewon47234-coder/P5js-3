// ====== 추상 미술 애니메이션 과제 #4 최종 완성본 ======

let t = 0;
let baseColors = [];

function setup() {
  createCanvas(600, 400);
  colorMode(HSB);
  frameRate(30);

  // 과제 1의 원래 색 기반
  baseColors = [
    color(240, 100, 100), // 파랑
    color(0, 100, 100),   // 빨강
    color(60, 100, 100),  // 노랑
    color(0, 0, 0),       // 검정
    color(0, 0, 100)      // 흰색
  ];
}

function draw() {
  background(220);
  t = frameCount * 0.02;

  // ======================================
  // ① 중앙 과녁 - 색상 변화 + 맥박(크기 변화)
  // ======================================
  let pulse = 1 + sin(t) * 0.1;

  for (let i = 0; i < 5; i++) {
    let c1 = baseColors[i];
    let c2 = color((frameCount + i * 30) % 360, 100, 100);
    let lerpCol = lerpColor(c1, c2, (sin(t + i) + 1) / 2);
    fill(lerpCol);
    ellipse(300, 200, (400 - i * 80) * pulse, (400 - i * 80) * pulse);
  }

  // ======================================
  // 레이더 스캔 효과 
  // ======================================
  push();
  translate(300, 200);
  rotate(t * 1.4);
  noStroke();
  fill(0, 0, 100, 0.5);
  arc(0, 0, 420, 420, 0, PI / 3);
  pop();

  // ======================================
  //  중앙 시계침 (초침 + 분침) 
  // ======================================
  push();
  translate(300, 200);

  // 초침
  let secAngle = frameCount * 0.1;
  stroke(0, 0, 100);
  strokeWeight(3);
  line(0, 0, cos(secAngle) * 180, sin(secAngle) * 180);

  // 분침
  let minAngle = frameCount * 0.02;
  stroke(0, 0, 0);
  strokeWeight(5);
  line(0, 0, cos(minAngle) * 130, sin(minAngle) * 130);

  pop();

  // ======================================
  // 과녁 밖을 도는 작은 궤도 원 
  // ======================================
  let orbitX = 300 + cos(t * 1.5) * 230;
  let orbitY = 200 + sin(t * 1.5) * 140;

  fill((frameCount * 5) % 360, 90, 100);
  ellipse(orbitX, orbitY, 35, 35);

  // ======================================
  // ② 삼각형 - 회전 + 크기 변화
  // ======================================

  // 왼쪽 삼각형
  push();
  translate(125, 100);
  rotate(-t * 0.8);
  let scaleL = 1 + sin(t * 1.5) * 0.3;
  scale(scaleL);
  fill((frameCount % 360), 80, 90);
  triangle(-75, -50, 75, -50, 0, 50);
  pop();

  // 오른쪽 삼각형
  push();
  translate(475, 100);
  rotate(t * 0.9);
  let scaleR = 1 + cos(t * 1.2) * 0.3;
  scale(scaleR);
  fill((frameCount * 2) % 360, 80, 90);
  triangle(-75, -50, 75, -50, 0, 50);
  pop();

  // ======================================
  // ③ 사변형(quad) - 점 흔들림 효과
  // ======================================
  fill((frameCount * 0.5) % 360, 60, 90, 0.8);
  quad(
    50 + sin(t) * 5, 250 + cos(t) * 5,
    200 + cos(t * 0.7) * 5, 230 + sin(t * 0.8) * 5,
    180 + sin(t * 1.3) * 5, 350 + cos(t * 1.1) * 5,
    40 + cos(t * 0.4) * 5, 360 + sin(t * 0.5) * 5
  );

  fill((frameCount * 0.7) % 360, 60, 90, 0.8);
  quad(
    400 + sin(t * 0.5) * 5, 280 + cos(t * 0.6) * 5,
    560 + cos(t * 0.9) * 5, 260 + sin(t * 0.5) * 5,
    520 + sin(t * 1.2) * 5, 370 + cos(t * 0.7) * 5,
    380 + cos(t * 1.1) * 5, 360 + sin(t * 0.8) * 5
  );

  // ======================================
  // ④ 원 - 크기 변화 + 진동 이동
  // ======================================

  // 왼쪽 원
  let leftSize = 100 + sin(t * 2) * 20;
  fill((frameCount * 3) % 360, 80, 100);
  ellipse(100, 300, leftSize, leftSize);

  // 오른쪽 원
  let moveX = cos(t) * 10;
  let moveY = sin(t) * 10;
  fill((frameCount * 4) % 360, 80, 100);
  ellipse(500 + moveX, 80 + moveY, 120, 120);

  // ======================================
  // ⑤ 아크 - 회전 효과
  // ======================================
  push();
  translate(150, 200);
  rotate(t * 0.7);
  fill(0, 0, 50);
  arc(0, 0, 100, 100, 0, radians(270));
  pop();

  push();
  translate(450, 200);
  rotate(-t * 0.5);
  fill(0, 0, 100);
  arc(0, 0, 100, 100, radians(90), radians(360));
  pop();
}

// ======================================
// GIF 저장 기능 (10초)
// s 키를 누르면 GIF 저장 시작됨
// ======================================
function keyPressed() {
  if (key === 's') {
    saveGif("abstract_animation.gif", 10);
  }
}
