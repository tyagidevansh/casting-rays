let walls = [];
let ray;
let particle;

const sceneW = 400;
const sceneH = 400;

function setup() {
    createCanvas(800, 400);
    for (let i = 0; i < 5; i += 1) {
        let x1 = random(sceneW);
        let x2 = random(sceneW);
        let y1 = random(height);
        let y2 = random(height);
        walls[i] = new Boundary(x1, y1, x2, y2);
    }
    walls.push(new Boundary(-1, -1, sceneW, -1));
    walls.push(new Boundary(sceneW, -1, sceneW, sceneH));
    walls.push(new Boundary(sceneW, sceneH, -1, sceneH));
    walls.push(new Boundary(-1, sceneH, -1, -1));
    particle = new Particle();
}

function draw() {
    if (keyIsDown(LEFT_ARROW)) {
        particle.rotate(-0.05);
    } else if (keyIsDown(RIGHT_ARROW)) {
        particle.rotate(0.05);
    } else if (keyIsDown(UP_ARROW)) {
        particle.move(1);
    } else if (keyIsDown(DOWN_ARROW)) {
        particle.move(-1);
    }

    background(0);
    for (let wall of walls) {
        wall.show();
    }
    particle.show();
    //particle.update(mouseX, mouseY);

    const scene = particle.look(walls);
    const w = sceneW / scene.length; 
    push();
    translate(sceneW, 0);
    for (let i = 0; i < scene.length; i++) {
        noStroke();
        const sq = scene[i] * scene[i];
        const wSq = sceneW * sceneW;
        const b = map(sq, 0, wSq, 255, 0);
        const h = map(scene[i], 0, sceneW, sceneH, 0);
        fill(b);
        rectMode(CENTER);
        rect(i * w + w/2, sceneH/2, w + 1, h);
    }
    pop();
}