const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fireworks = [];
const particles = [];

class Firework {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height;
    this.targetY = 0;
    this.radius = 2;
    this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    this.velocity = {
      x: Math.random() * 6 - 3,
      y: Math.random() * -15 - 10
    };
    this.gravity = 0.2;
    this.explosionForce = Math.random() * 20 + 5;
    this.particleCount = Math.floor(Math.random() * 80) + 20;
  }

  update() {
    this.velocity.y += this.gravity;
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    if (this.y <= this.targetY) {
      fireworks.splice(fireworks.indexOf(this), 1);
      this.explode();
    }
  }

  explode() {
    for (let i = 0; i < this.particleCount; i++) {
      const particle = new Particle(this.x, this.y, this.color);
      particles.push(particle);
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.radius = Math.random() * 2 + 1;
    this.color = color;
    this.velocity = {
      x: Math.random() * 6 - 3,
      y: Math.random() * 6 - 3
    };
    this.gravity = 0.2;
    this.alpha = 1;
  }

  update() {
    this.velocity.y += this.gravity;
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.alpha -= 0.02;

    if (this.alpha <= 0) {
      particles.splice(particles.indexOf(this), 1);
    }
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = '30px Arial';
  ctx.fillStyle = 'Orange';
  ctx.textAlign = 'center';
  ctx.fillText('Happy Birthday [Name]', canvas.width / 2, 50);

  if (Math.random() < 0.09) {
    fireworks.push(new Firework());
  }

  for (let i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].draw();
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].draw();
  }
}

animate();
