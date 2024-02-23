let walls = [];
let ray;
let particle;

const sceneW = 400;
const sceneH = 400;

function setup() {
    createCanvas(800, 400);
    for (let i = 0; i < 5; i += 1) {
        let x1 = random(width);
        let x2 = random(width);
        let y1 = random(height);
        let y2 = random(height);
        walls[i] = new Boundary(x1, y1, x2, y2);
    }
    walls.push(new Boundary(-1, -1, width, -1));
    walls.push(new Boundary(width, -1, width, height));
    walls.push(new Boundary(width, height, -1, height));
    walls.push(new Boundary(-1, height, -1, -1));
    particle = new Particle();
}

function draw() {
    background(0);
    for (let wall of walls) {
        wall.show();
    }
    particle.show();
    particle.update(mouseX, mouseY);

    const scene = particle.look(walls);
    console.log(scene);
    const w = sceneW / scene.length; 
    push();
    translate(sceneW, 0);
    for (let i = 0; i < scene.length; i++) {
        noStroke();
        const b = map(scene[i], 0, sceneW, 255, 0);
        fill(b);
        rect(i * w, 0, w, height);
    }
    pop();
}