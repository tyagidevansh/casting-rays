class Particle{
    constructor() {
        this.pos = createVector(width / 2, height / 2);
        this.heading = 0;
        this.rays = [];
        for (let a = -30; a < 30; a+= 1) {
            this.rays.push(new Ray(this.pos, radians(a)));
        }
    }

    show() {
        fill(255);
        ellipse(this.pos.x, this.pos.y, 4);
        for (let ray of this.rays){
            ray.show();
        }
    }

    rotate(angle) {
        this.heading += angle;
        for (let i = 0; i < this.rays.length; i += 1) {
            this.rays[i].setAngle(radians(i) + this.heading);
        }
    }

    move(amount) {
        const vel = p5.Vector.fromAngle(this.heading);
        vel.setMag(amount);
        this.pos.add(vel);
    }

    update(x,y) {
        this.pos.set(x,y);
    }

    look(walls) {
        let scene = [];
        for (let i = 0; i < this.rays.length; i++) {
            const ray = this.rays[i];
            let closest = null; 
            let record = Infinity; 
            for (let wall of walls) {
                const pt = ray.cast(wall);
                if (pt) {
                    let d = p5.Vector.dist(this.pos, pt)
                    let a = ray.dir.heading() - this.heading;
                    d *= cos(a);
                    if (d < record) {
                        record = d;
                        closest = pt;
                    }
                }
            } 
            if (closest) {
                stroke(255, 100);
                line(this.pos.x, this.pos.y, closest.x, closest.y);
            }
            scene[i] = record;
        }
        //console.log(scene);
        return scene;
    }
}