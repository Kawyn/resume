const NUMBER_OF_POINTS = 200;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

const r = Math.pow(canvas.width / 10, 2) + Math.pow(canvas.height / 10, 2);

const stars = [];
const FPS = 60;

class Point {

    constructor(x, y, radius, vx, vy) {

        this.x = x;
        this.y = y;

        this.radius = radius;

        this.vx = vx;
        this.vy = vy;
    }
}

for (let i = 0; i < NUMBER_OF_POINTS; i++)
    stars.push(new Point(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() + 1, Math.floor(Math.random() * 50) - 25, Math.floor(Math.random() * 50) - 25));

// Draw the scene

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.globalCompositeOperation = "lighter";

    for (var i = 0, x = stars.length; i < x; i++) {
        var s = stars[i];

        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = 'black';
        ctx.stroke();
    }

    ctx.beginPath();

    for (let i = 0; i < stars.length; i++) {

        const a = stars[i];
        ctx.moveTo(a.x, a.y);

        for (let j = i + 1; j < stars.length; j++) {

            const b = stars[j];

            if (sqrtDistance(a, b) < r) {

                ctx.lineTo(b.x, b.y);
            }
        }
    }
    ctx.globalAlpha = 0.5;

    ctx.lineWidth = 0.05;
    ctx.strokeStyle = 'white';

    ctx.stroke();
}

const sqrtDistance = (x, y) => {

    let xs = 0;
    let ys = 0;

    xs = y.x - x.x;
    xs = xs * xs;

    ys = y.y - x.y;
    ys = ys * ys;

    return xs + ys;
}

const refresh = () => {

    for (var i = 0, x = stars.length; i < x; i++) {
        var s = stars[i];

        s.x += s.vx / FPS;
        s.y += s.vy / FPS;

        if (s.x < 0 || s.x > canvas.width) s.vx = -s.vx;
        if (s.y < 0 || s.y > canvas.height) s.vy = -s.vy;
    }

    draw();

    requestAnimationFrame(refresh);
}

refresh();