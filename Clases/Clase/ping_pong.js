const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

class Boundary {
  static width = 40;
  static height = 40;
  constructor({ position }) {
    this.position = position;
    this.width = 40;
    this.height = 40;
  }

  draw() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}

class Player {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.radius = 10;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(
      this.position.x,
      this.position.y,
      this.radius,
      0,
      Math.PI * 2
    );
    ctx.fillStyle = 'yellow';
    ctx.fill();
    ctx.closePath();
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

const boundaries = [];
const player = new Player({
  position: {
    x: Boundary.width + Boundary.width / 2,
    y: Boundary.width + Boundary.width / 2,
  },
  velocity: {
    x: 0,
    y: 0,
  },
});
const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

let lastKey;

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  boundaries.forEach((boundary) => {
    boundary.draw();

    if (
      circleCollidesWithRectangle({
        circle: player,
        rectangle: boundary,
      })
    ) {
      console.log('we are colliding');
      player.velocity.x = 0;
      player.velocity.y = 0;
    }
  });

  player.update();

  if (keys.w.pressed && lastKey === 'w') {
    boundaries.forEach((boundary) => {
      if (
        circleCollidesWithRectangle({
          circle: player,
          rectangle: boundary,
        })
      ) {
        player.velocity.y = 0;
      } else {
        player.velocity.y = -5;
      }
    });
  } else if (keys.a.pressed && lastKey === 'a') {
    player.velocity.x = -5;
  } else if (keys.s.pressed && lastKey === 's') {
    player.velocity.y = 5;
  } else if (keys.d.pressed && lastKey === 'd') {
    player.velocity.x = 5;
  }
}

animate();

addEventListener('keydown', ({ key }) => {
  switch (key) {
    case 'w':
      keys.w.pressed = true;
      lastKey = 'w';
      break;
    case 'a':
      keys.a.pressed = true;
      lastKey = 'a';
      break;
    case 's':
      keys.s.pressed = true;
      lastKey = 's';
      break;
    case 'd':
      keys.d.pressed = true;
      lastKey = 'd';
      break;
  }
});

addEventListener('keyup', ({ key }) => {
  switch (key) {
    case 'w':
      keys.w.pressed = false;
      break;
    case 'a':
      keys.a.pressed = false;
      break;
    case 's':
      keys.s.pressed = false;
      break;
    case 'd':
      keys.d.pressed = false;
      break;
  }
});

function circleCollidesWithRectangle({ circle, rectangle }) {
return (
circle.position.y - circle.radius + circle.velocity.y <=
rectangle.position.y + rectangle.height &&
circle.position.x + circle.radius + circle.velocity.x >=
rectangle.position.x &&
circle.position.y + circle.radius + circle.velocity.y >=
rectangle.position.y &&
circle.position.x - circle.radius + circle.velocity.x <=
rectangle.position.x + rectangle.width
);
}
